import express from "express";

import protect from "../middlewares/authMiddleware.js";

import {
  createPackage,
  getAllPackages,
  getActivePackages,
  getPackageById,
  updatePackage,
  deletePackage,
} from "../controllers/packageController.js";

const router = express.Router();

// ==========================================
// Public Route
// ==========================================

// Get only active packages
router.get("/active", getActivePackages);

// ==========================================
// Admin Routes
// ==========================================

// Get all packages
router.get("/", getAllPackages);

// Get single package
router.get("/:id", protect, getPackageById);

// Create package
router.post("/", protect, createPackage);

// Update package
router.put("/:id", protect, updatePackage);

// Delete package
router.delete("/:id", protect, deletePackage);

export default router;