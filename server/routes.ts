import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      
      // In a real implementation, you would save to database and send email
      // For now, we'll just log the submission and return success
      console.log("Contact form submission:", validatedData);
      
      // Simulate email sending (replace with actual email service like nodemailer)
      console.log(`Sending email notification for contact from ${validatedData.email}`);
      
      res.json({ 
        success: true, 
        message: "Thank you for your message. I'll get back to you soon!" 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message. Please try again later." 
        });
      }
    }
  });

  // Resume download endpoint
  app.get("/api/resume/download", (req, res) => {
    try {
      // In a real implementation, you would serve the actual resume file
      // For now, we'll return a placeholder response
      const resumePath = path.join(process.cwd(), "attached_assets", "Subharaj Das_1751369414549.pdf");
      
      if (fs.existsSync(resumePath)) {
        res.download(resumePath, "Subharaj_Das_Resume.pdf");
      } else {
        // Return the resume content as a response for now
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="Subharaj_Das_Resume.pdf"');
        res.status(200).json({
          message: "Resume download would be triggered here. PDF file not found in current setup."
        });
      }
    } catch (error) {
      console.error("Resume download error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to download resume. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
