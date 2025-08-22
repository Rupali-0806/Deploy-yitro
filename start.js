#!/usr/bin/env node

/**
 * Yitro CRM Platform - Production Startup Script
 *
 * This script starts the production CRM server with all necessary configurations.
 * It handles database connections, server setup, and error handling.
 */

const express = require("express");
const path = require("path");
const { createServer } = require("./dist/server/node-build.mjs");

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "production";
<<<<<<< HEAD
const DOMAIN = process.env.DOMAIN || "https://dealhub.yitrobc.net";

console.log("🚀 Starting DealHub CRM Platform...");
=======

console.log("🚀 Starting Yitro CRM Platform...");
>>>>>>> refs/remotes/origin/main
console.log(`📊 Environment: ${NODE_ENV}`);
console.log(`🌐 Port: ${PORT}`);
console.log(`🌍 Domain: ${DOMAIN}`);

try {
  // Create the server
  const app = createServer();

  // Serve static files in production
  if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "dist/spa")));

    // Handle client-side routing
    app.get("*", (req, res) => {
      // Skip API routes
      if (req.path.startsWith("/api/")) {
        return res.status(404).json({ error: "API endpoint not found" });
      }

      res.sendFile(path.join(__dirname, "dist/spa/index.html"));
    });
  }

  // Start the server
<<<<<<< HEAD
  app.listen(PORT, "0.0.0.0", () => {
    console.log("✅ DealHub CRM Platform is running!");
    console.log(`🌍 Local access: http://localhost:${PORT}`);
    console.log(`🌐 Production URL: ${DOMAIN}`);
=======
  app.listen(PORT, () => {
    console.log("✅ Yitro CRM Platform is running!");
    console.log(`🌍 Server running on port: ${PORT}`);
    console.log(`🌐 Access your CRM at: https://dealhub.yitrobc.net`);
>>>>>>> refs/remotes/origin/main
    console.log("📱 Features available:");
    console.log("   • Complete CRM functionality");
    console.log("   • User profile management");
    console.log("   • Real-time dashboard metrics");
    console.log("   • Professional reports");
    console.log("   • Dark/Light mode themes");
    console.log("   • Responsive mobile design");
<<<<<<< HEAD
    console.log("   • SQLite database integration");
=======
>>>>>>> refs/remotes/origin/main
    console.log("");
    console.log("🎯 Ready for production use!");
  });
} catch (error) {
<<<<<<< HEAD
  console.error("❌ Failed to start DealHub CRM Platform:");
=======
  console.error("❌ Failed to start Yitro CRM Platform:");
>>>>>>> refs/remotes/origin/main
  console.error(error.message);
  console.error("");
  console.error("📋 Troubleshooting steps:");
  console.error('1. Run "npm install" to ensure dependencies are installed');
  console.error('2. Run "npm run build" to build the application');
<<<<<<< HEAD
  console.error("3. Check that DATABASE_URL is configured correctly (SQLite)");
  console.error("4. Verify that port", PORT, "is available");
  console.error("5. Ensure the data directory exists for SQLite database");
=======
  console.error("3. Check that DATABASE_URL is configured correctly");
  console.error("4. Verify that port", PORT, "is available");
>>>>>>> refs/remotes/origin/main
  process.exit(1);
}

// Handle graceful shutdown
process.on("SIGTERM", () => {
<<<<<<< HEAD
  console.log("🛑 Shutting down DealHub CRM Platform gracefully...");
=======
  console.log("🛑 Shutting down Yitro CRM Platform gracefully...");
>>>>>>> refs/remotes/origin/main
  process.exit(0);
});

process.on("SIGINT", () => {
<<<<<<< HEAD
  console.log("🛑 Shutting down DealHub CRM Platform gracefully...");
=======
  console.log("🛑 Shutting down Yitro CRM Platform gracefully...");
>>>>>>> refs/remotes/origin/main
  process.exit(0);
});
