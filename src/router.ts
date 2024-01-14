import express from "express";
import userRoutes from "./routes/users.routes";
import authRoutes from "./routes/auth.routes";

// -----------------------------------------------------------------------------

const router = express.Router();

// User routes
router.use("/api/users", userRoutes);

// Auth routes
router.use("/auth", authRoutes);

export default router;