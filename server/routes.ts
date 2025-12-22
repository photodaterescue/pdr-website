import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSupportSubmissionSchema } from "@shared/schema";
import { getUncachableResendClient } from "./resend";

const SUPPORT_EMAIL = "admin@photodaterescue.com";
const FROM_EMAIL = "support@updates.photodaterescue.com";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Support form submission endpoint - handle all methods to diagnose 405
  app.all("/api/support", async (req, res) => {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed", method: req.method, expected: "POST" });
    }
    try {
      const validatedData = insertSupportSubmissionSchema.parse(req.body);
      const submission = await storage.createSupportSubmission(validatedData);
      
      // Send email using Resend
      try {
        const { client } = await getUncachableResendClient();
        
        const subjectLine = `[PDR Support] source=${submission.source} | ${submission.category}`;
        
        const emailBody = `
New support request received:

Email: ${submission.email}
Category: ${submission.category}
Source: ${submission.source}
App Version: ${submission.app_version || 'N/A'}
OS: ${submission.os || 'unknown'}
Page Referrer: ${submission.page_referrer || 'N/A'}
Timestamp: ${submission.timestamp}

Message:
${submission.message}

---
Support Request ID: ${submission.id}
        `.trim();

        await client.emails.send({
          from: FROM_EMAIL,
          to: SUPPORT_EMAIL,
          replyTo: submission.email,
          subject: subjectLine,
          text: emailBody,
        });
        
        console.log("[Support Submission] Email sent successfully", {
          id: submission.id,
          to: SUPPORT_EMAIL,
        });
      } catch (emailError) {
        console.error("[Support Submission] Failed to send email:", emailError);
        // Still return success to user - we have the submission stored
      }
      
      res.json({ success: true, id: submission.id });
    } catch (error) {
      console.error("Support submission error:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid request" 
      });
    }
  });

  return httpServer;
}
