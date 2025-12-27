import type { Express } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import fs from "fs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
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
