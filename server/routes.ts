import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { storage } from "./storage";
import { hashPassword, verifyPassword } from "./auth";
import { db } from "./db";
import { users, streak } from "@shared/schema";
import { eq } from "drizzle-orm";
import path from "path";
import fs from "fs";

// ─── Session type augmentation ────────────────────────────────────────────────

declare module "express-session" {
  interface SessionData {
    userId: number;
    userRole: string;
  }
}

// ─── Auth middleware ──────────────────────────────────────────────────────────

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }
  next();
}

export function requireSuperadmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId || req.session?.userRole !== "superadmin") {
    return res.status(403).json({ success: false, message: "Superadmin access required" });
  }
  next();
}

// ─── Validation schemas ───────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const signupSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6),
});

// ─── Route registration ───────────────────────────────────────────────────────

export async function registerRoutes(app: Express): Promise<Server> {

  // ── EXISTING: Contact form ─────────────────────────────────────────────────

  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const savedSubmission = await storage.createContactSubmission(validatedData);
      console.log("Contact form submission saved:", savedSubmission);
      res.json({
        success: true,
        message: "Thank you for your message. I'll get back to you soon!",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Invalid form data", errors: error.errors });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
      }
    }
  });

  // ── EXISTING: Resume download ──────────────────────────────────────────────

  app.get("/api/resume/download", (req, res) => {
    try {
      const resumePath = path.join(process.cwd(), "attached_assets", "Subharaj Das_1753525748886.pdf");
      if (fs.existsSync(resumePath)) {
        res.download(resumePath, "Subharaj_Das_Resume.pdf");
      } else {
        res.status(404).json({ success: false, message: "Resume file not found." });
      }
    } catch (error) {
      console.error("Resume download error:", error);
      res.status(500).json({ success: false, message: "Failed to download resume." });
    }
  });

  // ── AUTH: Sign up ──────────────────────────────────────────────────────────

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, password } = signupSchema.parse(req.body);

      // Check duplicate
      const existing = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .limit(1);

      if (existing.length > 0) {
        return res.status(409).json({ success: false, message: "An account with this email already exists." });
      }

      const { hash, salt } = hashPassword(password);
      const [newUser] = await db
        .insert(users)
        .values({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          passwordHash: hash,
          salt,
          role: "user",
          isActive: true,
          onboardingComplete: false,
        })
        .returning();

      // Create streak record for new user
      await db.insert(streak).values({ userId: newUser.id });

      return res.json({ success: true, message: "Account created successfully." });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid data", errors: error.errors });
      }
      console.error("Signup error:", error);
      return res.status(500).json({ success: false, message: "Failed to create account." });
    }
  });

  // ── AUTH: Login ────────────────────────────────────────────────────────────

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase().trim()))
        .limit(1);

      if (!user) {
        return res.status(401).json({ success: false, message: "No account found with this email." });
      }

      if (!user.isActive) {
        return res.status(403).json({ success: false, message: "Account is inactive. Contact support." });
      }

      const valid = verifyPassword(password, user.passwordHash, user.salt);
      if (!valid) {
        return res.status(401).json({ success: false, message: "Incorrect password." });
      }

      // Update last login
      await db
        .update(users)
        .set({ lastLogin: new Date() })
        .where(eq(users.id, user.id));

      // Set session
      req.session.userId = user.id;
      req.session.userRole = user.role;

      const safeUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        onboardingComplete: user.onboardingComplete,
        createdAt: user.createdAt,
      };

      return res.json({ success: true, user: safeUser });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ success: false, message: "Invalid data", errors: error.errors });
      }
      console.error("Login error:", error);
      return res.status(500).json({ success: false, message: "Login failed." });
    }
  });

  // ── AUTH: Logout ───────────────────────────────────────────────────────────

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Logout failed." });
      }
      res.clearCookie("connect.sid");
      return res.json({ success: true, message: "Logged out." });
    });
  });

  // ── AUTH: Me (session check) ───────────────────────────────────────────────

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session?.userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    try {
      const [user] = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          onboardingComplete: users.onboardingComplete,
          createdAt: users.createdAt,
        })
        .from(users)
        .where(eq(users.id, req.session.userId))
        .limit(1);

      if (!user) {
        req.session.destroy(() => {});
        return res.status(401).json({ success: false, message: "Session invalid." });
      }

      return res.json({ success: true, user });
    } catch (error) {
      console.error("Auth me error:", error);
      return res.status(500).json({ success: false, message: "Failed to get user." });
    }
  });

  // ── ADMIN: List all users ─────────────────────────────────────────────────

  app.get("/api/admin/users", requireSuperadmin, async (req, res) => {
    try {
      const allUsers = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          isActive: users.isActive,
          onboardingComplete: users.onboardingComplete,
          createdAt: users.createdAt,
          lastLogin: users.lastLogin,
        })
        .from(users)
        .orderBy(users.createdAt);

      return res.json({ success: true, users: allUsers });
    } catch (error) {
      console.error("Admin users error:", error);
      return res.status(500).json({ success: false, message: "Failed to fetch users." });
    }
  });

  // ── ADMIN: Toggle user active ─────────────────────────────────────────────

  app.patch("/api/admin/users/:id/toggle", requireSuperadmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { isActive } = req.body;

      await db
        .update(users)
        .set({ isActive: Boolean(isActive) })
        .where(eq(users.id, userId));

      return res.json({ success: true });
    } catch (error) {
      console.error("Toggle user error:", error);
      return res.status(500).json({ success: false, message: "Failed to update user." });
    }
  });

  // 6PS routes
  const { register6PSRoutes } = await import('./routes-6ps.js');
  register6PSRoutes(app);

  const httpServer = createServer(app);
  return httpServer;
}
