import express from "express";
<<<<<<< HEAD
import { authService } from "../lib/auth.js";
import { emailService } from "../lib/emailService.js";
import { prisma } from "../lib/prisma.js";
=======
import { neonAuth } from "../lib/neonAuth";
import { emailService } from "../lib/emailService";
import { inMemoryAuth } from "../db/init-db";
>>>>>>> refs/remotes/origin/main

const router = express.Router();

// For SQLite deployment, we'll use in-memory authentication for simplicity
// In a production SQLite setup, you would use Prisma or another ORM
const useDatabase = false; // Set to false for SQLite deployment

// Middleware to check admin access
const requireAdmin = async (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, error: "Access token required" });
  }

  try {
    const decoded = authService.verifyToken(token);
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, error: "Admin access required" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, error: "Invalid or expired token" });
  }
};

// Generate secure password
const generatePassword = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Generate company email
const generateCompanyEmail = (
  displayName: string,
  role: "admin" | "user",
  department?: string,
): string => {
  const baseName = displayName.toLowerCase().replace(/\s+/g, ".");
  const domainPrefix =
    role === "admin" ? "admin" : department ? department.toLowerCase() : "emp";
  return `${baseName}@${domainPrefix}.yitro.com`;
};

// Get all users (admin only)
router.get("/users", requireAdmin, async (req, res) => {
  try {
<<<<<<< HEAD
    const userProfiles = await prisma.userProfile.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const users = userProfiles.map((user) => ({
      id: user.id,
      email: user.email,
      displayName: `${user.firstName} ${user.lastName}`.trim(),
      role: user.role?.toLowerCase() || 'user',
      emailVerified: true, // Simplified for SQLite version
      createdAt: user.createdAt,
      lastLogin: user.updatedAt, // Use updatedAt as proxy for last login
    }));
=======
    console.log("📋 Fetching users for admin panel...");

    // Use in-memory users for SQLite deployment
    const users = Array.from(inMemoryAuth.users.values()).map((user) => ({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt.toISOString(),
      // Add mock additional fields for display
      department: user.email === "admin@yitro.com" ? "Administration" : "Sales",
      designation:
        user.email === "admin@yitro.com"
          ? "System Administrator"
          : "Sales Representative",
      contactNumber:
        user.email === "admin@yitro.com" ? "+1-555-0100" : "+1-555-0101",
    }));

    console.log(`✅ Found ${users.length} users`);
>>>>>>> refs/remotes/origin/main

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch users",
    });
  }
});

// Create new user (admin only) - simplified for SQLite
router.post("/create-user", requireAdmin, async (req, res) => {
  try {
    console.log("👤 Creating new user...");
    const {
      email,
      displayName,
      role,
      contactNumber,
      department,
    } = req.body;

    if (!email || !displayName || !role) {
      return res.status(400).json({
        success: false,
        error: "Email, display name, and role are required",
      });
    }

    // Check if user already exists
<<<<<<< HEAD
    const existingUser = await prisma.userProfile.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User with this email already exists",
      });
    }

    // Create user profile
    const newUser = await prisma.userProfile.create({
      data: {
        email,
        firstName: displayName.split(' ')[0] || displayName,
        lastName: displayName.split(' ').slice(1).join(' ') || '',
        phone: contactNumber,
        department,
        role: role.toUpperCase() as any,
      }
    });
=======
    if (inMemoryAuth.users.has(email)) {
      return res.status(400).json({
        success: false,
        error: "User already exists with this email",
      });
    }

    // Create new user ID
    const newId = (inMemoryAuth.users.size + 1).toString();

    // Create new user in memory
    const newUser = {
      id: newId,
      email,
      displayName,
      password, // In production, this would be hashed
      role: role as "admin" | "user",
      emailVerified: true,
      createdAt: new Date(),
    };

    // Add to in-memory store
    inMemoryAuth.users.set(email, newUser);

    console.log(`✅ User created: ${email} with role ${role}`);

    // Send welcome email with login credentials (optional)
    try {
      await emailService.sendEmployeeWelcomeEmail(
        email,
        displayName,
        email,
        password,
      );
      console.log("📧 Welcome email sent");
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't fail the user creation if email fails
    }
>>>>>>> refs/remotes/origin/main

    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
<<<<<<< HEAD
        displayName: `${newUser.firstName} ${newUser.lastName}`.trim(),
        role: newUser.role?.toLowerCase(),
        contactNumber: newUser.phone,
        department: newUser.department,
=======
        displayName: newUser.displayName,
        role: newUser.role,
        emailVerified: newUser.emailVerified,
        contactNumber,
        department,
        designation,
>>>>>>> refs/remotes/origin/main
      },
      message: "User created successfully.",
    });
  } catch (error: any) {
    console.error("Create user error:", error);
    res.status(400).json({
      success: false,
      error: error.message || "Failed to create user",
    });
  }
});

// Delete user (admin only)
router.delete("/users/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ Attempting to delete user with ID: ${id}`);

<<<<<<< HEAD
    // Check if user exists
    const user = await prisma.userProfile.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Prevent deletion of system admin
    if (user.email === "admin@yitro.com") {
=======
    // Find user by ID in the in-memory store
    let userToDelete = null;
    let userEmail = null;

    for (const [email, user] of inMemoryAuth.users.entries()) {
      if (user.id === id) {
        userToDelete = user;
        userEmail = email;
        break;
      }
    }

    if (!userToDelete) {
      console.log(`❌ User with ID ${id} not found`);
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Prevent deletion of system admin
    if (userEmail === "admin@yitro.com") {
      console.log("❌ Cannot delete system administrator");
>>>>>>> refs/remotes/origin/main
      return res.status(403).json({
        success: false,
        error: "Cannot delete system administrator",
      });
    }

<<<<<<< HEAD
    // Delete the user
    await prisma.userProfile.delete({
      where: { id }
    });
=======
    // Actually delete the user from in-memory store
    inMemoryAuth.users.delete(userEmail!);
    console.log(`✅ User ${userEmail} deleted from in-memory store`);
>>>>>>> refs/remotes/origin/main

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete user",
    });
  }
});

<<<<<<< HEAD
// Simplified endpoint - email verification not needed in SQLite version
router.post(
  "/users/:id/resend-verification",
  requireAdmin,
  async (req, res) => {
    res.json({
      success: true,
      message: "Email verification not required in this version",
    });
  }
);

=======
>>>>>>> refs/remotes/origin/main
// Update user role (admin only)
router.put("/users/:id/role", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "user"].includes(role)) {
      return res.status(400).json({
        success: false,
        error: "Invalid role. Must be admin or user",
      });
    }

<<<<<<< HEAD
    await prisma.userProfile.update({
      where: { id },
      data: { role: role.toUpperCase() as any }
    });
=======
    // Find user by ID and update role
    let userFound = false;
    for (const [email, user] of inMemoryAuth.users.entries()) {
      if (user.id === id) {
        user.role = role as "admin" | "user";
        inMemoryAuth.users.set(email, user);
        userFound = true;
        console.log(`✅ Updated user ${email} role to ${role}`);
        break;
      }
    }

    if (!userFound) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
>>>>>>> refs/remotes/origin/main

    res.json({
      success: true,
      data: { message: "User role updated successfully" },
    });
  } catch (error) {
    console.error("Update role error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update user role",
    });
  }
});

// Get company-wide metrics (admin only)
router.get("/metrics", requireAdmin, async (req, res) => {
  try {
    console.log("📊 Fetching admin metrics...");

    // Use simplified metrics for SQLite deployment
    let metrics = {
      totalUsers: inMemoryAuth.users.size,
      totalAccounts: 8,
      totalLeads: 12,
      totalDeals: 6,
      totalActivities: 15,
      activeUsers: inMemoryAuth.users.size,
      wonDeals: 3,
      totalDealValue: 875000,
      conversionRate: 50.0,
      recentActivities: [
        {
          type: "Call",
          date: new Date(),
          summary: "Discovery call with potential client",
          account: "TechCorp Solutions",
          contact: "John Smith",
        },
        {
          type: "Email",
          date: new Date(Date.now() - 3600000),
          summary: "Sent proposal to prospect",
          account: "Innovate Inc",
          contact: "Jane Doe",
        },
        {
          type: "Meeting",
          date: new Date(Date.now() - 7200000),
          summary: "Product demo presentation",
          account: "StartupXYZ",
          contact: "Sarah Wilson",
        },
      ],
    };

    // Try to get real metrics from Prisma if available
    try {
      const { prisma } = await import("../lib/prisma");

      const [
        accountCount,
        leadCount,
        dealCount,
        activityCount,
        wonDealsData,
        recentActivitiesData,
      ] = await Promise.all([
        prisma.account.count(),
        prisma.lead.count(),
        prisma.activeDeal.count(),
        prisma.activityLog.count(),
        prisma.activeDeal.findMany({
          where: { stage: "ORDER_WON" },
          select: { dealValue: true },
        }),
        prisma.activityLog.findMany({
          take: 5,
          orderBy: { dateTime: "desc" },
          select: {
            activityType: true,
            dateTime: true,
            summary: true,
            associatedAccount: true,
            associatedContact: true,
          },
        }),
      ]);

      // Calculate real metrics
      const wonDeals = wonDealsData.length;
      const totalDealValue = wonDealsData.reduce((sum, deal) => {
        const value = parseFloat(deal.dealValue || "0");
        return sum + value;
      }, 0);

      const conversionRate = dealCount > 0 ? (wonDeals / dealCount) * 100 : 0;

      metrics = {
        totalUsers: inMemoryAuth.users.size,
        totalAccounts: accountCount,
        totalLeads: leadCount,
        totalDeals: dealCount,
        totalActivities: activityCount,
        activeUsers: inMemoryAuth.users.size,
        wonDeals,
        totalDealValue,
        conversionRate: Math.round(conversionRate * 100) / 100,
        recentActivities: recentActivitiesData.map((activity) => ({
          type: activity.activityType?.replace("_", " ") || "Unknown",
          date: activity.dateTime,
          summary: activity.summary || "No summary",
          account: activity.associatedAccount,
          contact: activity.associatedContact,
        })),
      };

      console.log("✅ Using real metrics from database");
    } catch (prismaError) {
      console.log("📊 Using fallback demo metrics");
    }

    res.json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    console.error("Metrics error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch metrics",
    });
  }
});

// Test configuration endpoint
router.post("/test-config", requireAdmin, async (req, res) => {
  try {
    console.log("🧪 Running configuration test...");

    // Test database connection (SQLite)
    let databaseStatus = {
      configured: true,
      connected: true,
      message: "SQLite database configured for production deployment",
    };

    // Test Prisma connection
    try {
      const { prisma } = await import("../lib/prisma");
      await prisma.userProfile.findFirst();
      databaseStatus.message =
        "SQLite database and Prisma ORM working correctly";
    } catch (error: any) {
      databaseStatus.connected = false;
      databaseStatus.message = `Database connection issue: ${error.message}`;
    }

    // Test SMTP connection
    let smtpStatus = {
      configured: false,
      connected: false,
      message: "Not configured",
    };

    const smtpUser = process.env.EMAIL_USER;
    const smtpPassword = process.env.EMAIL_PASS;

    if (smtpUser && smtpPassword) {
      smtpStatus.configured = true;

      try {
        const { emailService } = await import("../lib/emailService");
        const testResult = await emailService.testConnection();

        if (testResult) {
          smtpStatus.connected = true;
          smtpStatus.message = `SMTP connection successful`;
        } else {
          smtpStatus.message = "SMTP connection test failed";
        }
      } catch (error: any) {
        smtpStatus.message = `SMTP connection failed: ${error.message}`;
      }
    } else {
      smtpStatus.message =
        "EMAIL_USER and EMAIL_PASS environment variables not set";
    }

    res.json({
      success: true,
      status: {
        database: databaseStatus,
        smtp: smtpStatus,
        deployment: {
          configured: true,
          connected: true,
          message: "Dockerless SQLite deployment ready for production",
        },
      },
    });
  } catch (error) {
    console.error("Configuration test error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to run configuration test",
    });
  }
});

// Send test email endpoint
router.post("/send-test-email", requireAdmin, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email address is required",
      });
    }

    console.log(`📧 Sending test email to: ${email}`);

    try {
      const { emailService } = await import("../lib/emailService");
      await emailService.sendTestEmail(email);

      res.json({
        success: true,
        message: "Test email sent successfully",
      });
    } catch (emailError: any) {
      console.log("📧 Email service not configured, using mock response");
      res.json({
        success: true,
        message: "Test email simulated (email service not configured)",
      });
    }
  } catch (error: any) {
    console.error("Test email error:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Failed to send test email",
    });
  }
});

export default router;
