import express from "express";
import appointmentRoutes from "./routes/appointments.routes";
import authRoutes from "./routes/auth.routes";
import centerRoutes from "./routes/centers.routes";
import serviceRoutes from "./routes/services.routes";
import userRoutes from "./routes/users.routes";

// -----------------------------------------------------------------------------

const router = express.Router();

// User routes
router.use("/api/users", userRoutes);

// Center routes
router.use("/api/services", serviceRoutes);

// Center routes
router.use("/api/centers", centerRoutes);

// Appointment routes
router.use("/api/appointments", appointmentRoutes);

// Auth routes
router.use("/auth", authRoutes);

export default router;