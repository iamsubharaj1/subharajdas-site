import crypto from "crypto";
import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

// ─── Password hashing (crypto built-in, no bcrypt dep needed) ────────────────

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const verifyHash = crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha512")
      .toString("hex");
    return crypto.timingSafeEqual(
      Buffer.from(hash, "hex"),
      Buffer.from(verifyHash, "hex")
    );
  } catch {
    return false;
  }
}

// ─── Superadmin seeding (runs once on server start) ──────────────────────────

export async function seedSuperadmin(): Promise<void> {
  const email = process.env.SUPERADMIN_EMAIL;
  const password = process.env.SUPERADMIN_PASSWORD;
  const name = process.env.SUPERADMIN_NAME || "Subharaj Das";

  if (!email || !password) {
    console.log("[auth] SUPERADMIN_EMAIL or SUPERADMIN_PASSWORD not set — skipping seed");
    return;
  }

  try {
    const existing = await db
      .select({ id: users.id, role: users.role })
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      // Ensure role is superadmin (in case it was changed)
      if (existing[0].role !== "superadmin") {
        await db
          .update(users)
          .set({ role: "superadmin" })
          .where(eq(users.email, email.toLowerCase()));
        console.log("[auth] Superadmin role enforced for", email);
      } else {
        console.log("[auth] Superadmin already exists —", email);
      }
      return;
    }

    const { hash, salt } = hashPassword(password);
    await db.insert(users).values({
      name,
      email: email.toLowerCase(),
      passwordHash: hash,
      salt,
      role: "superadmin",
      isActive: true,
      onboardingComplete: false,
    });
    console.log("[auth] Superadmin created —", email);
  } catch (err) {
    console.error("[auth] Superadmin seed failed:", err);
  }
}
