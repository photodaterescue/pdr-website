import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSupportSubmissionSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Support form submission endpoint
  app.post("/api/support", async (req, res) => {
    try {
      const validatedData = insertSupportSubmissionSchema.parse(req.body);
      const submission = await storage.createSupportSubmission(validatedData);
      
      // Log submission for debugging (in production, this would be sent to email service)
      console.log("[Support Submission]", {
        id: submission.id,
        email: submission.email,
        category: submission.category,
        source: submission.source,
        timestamp: submission.timestamp,
      });
      
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
