import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import fs from "fs";
import { getUncachableResendClient } from "./resend";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Version check endpoint for desktop app updates
  app.get("/api/version.json", (_req, res) => {
    res.json({
      version: "1.0.1",
      mandatory: false,
      downloadUrl: "https://app.lemonsqueezy.com/my-orders",
      releaseNotes: "Initial release of Photo Date Rescue"
    });
  });

  // Affiliate Application endpoint
  app.post("/api/affiliate", async (req, res) => {
    try {
      const data = req.body;
      const { client, fromEmail } = await getUncachableResendClient();
      
      const name = data.name || "Unknown";
      const website = data.platform_url || data.website || "Not provided";
      const subject = `Affiliate Application – ${name} – ${website}`;
      
      const fields = Object.entries(data)
        .filter(([key]) => !["form_type", "timestamp", "page_referrer"].includes(key))
        .map(([key, value]) => `<strong>${key.replace(/_/g, " ")}:</strong> ${value || "Not provided"}`)
        .join("<br>");
      
      const htmlBody = `
        <h2>Submission type: Affiliate Application</h2>
        <hr>
        <p>${fields}</p>
        <hr>
        <p><em>Submitted: ${data.timestamp || new Date().toISOString()}</em></p>
        <p><em>Referrer: ${data.page_referrer || "direct"}</em></p>
      `;
      
      await client.emails.send({
        from: fromEmail,
        to: "admin@photodaterescue.com",
        subject,
        html: htmlBody,
      });
      
      res.json({ success: true, message: "Affiliate application submitted" });
    } catch (error: any) {
      console.error("Affiliate submission error:", error);
      res.status(500).json({ error: "Failed to submit application" });
    }
  });

  // Partner Enquiry endpoint
  app.post("/api/partner", async (req, res) => {
    try {
      const data = req.body;
      const { client, fromEmail } = await getUncachableResendClient();
      
      const companyName = data.company_name || "Unknown Company";
      const subject = `Partner Enquiry – ${companyName}`;
      
      const fields = Object.entries(data)
        .filter(([key]) => !["form_type", "timestamp", "page_referrer"].includes(key))
        .map(([key, value]) => `<strong>${key.replace(/_/g, " ")}:</strong> ${value || "Not provided"}`)
        .join("<br>");
      
      const htmlBody = `
        <h2>Submission type: Partner Enquiry</h2>
        <hr>
        <p>${fields}</p>
        <hr>
        <p><em>Submitted: ${data.timestamp || new Date().toISOString()}</em></p>
        <p><em>Referrer: ${data.page_referrer || "direct"}</em></p>
      `;
      
      await client.emails.send({
        from: fromEmail,
        to: "admin@photodaterescue.com",
        subject,
        html: htmlBody,
      });
      
      res.json({ success: true, message: "Partner enquiry submitted" });
    } catch (error: any) {
      console.error("Partner submission error:", error);
      res.status(500).json({ error: "Failed to submit enquiry" });
    }
  });

  // In development, serve static files directly from client/public
  // This ensures HTML files are served fresh without needing a rebuild
  if (process.env.NODE_ENV !== "production") {
    const publicDir = path.resolve(import.meta.dirname, "..", "client", "public");
    
    // Serve static HTML files from client/public
    app.use((req, res, next) => {
      const cleanPath = req.path;
      
      // Check if it's a request for an HTML file or a path that maps to one
      let filePath = path.join(publicDir, cleanPath);
      
      // If path ends with .html, check if file exists
      if (cleanPath.endsWith(".html") && fs.existsSync(filePath)) {
        res.sendFile(filePath);
        return;
      }
      
      next();
    });
    
    // Serve other static assets (images, css, js) from client/public
    app.use(express.static(publicDir));
  }

  return httpServer;
}
