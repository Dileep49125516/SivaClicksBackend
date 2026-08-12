import express from "express";

import {
  createTestimonial,
  getApprovedTestimonials,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ==========================================
   PUBLIC ROUTES
========================================== */

// Submit a review
router.post("/", createTestimonial);

// Get approved reviews
router.get("/", getApprovedTestimonials);


/* ==========================================
   ADMIN ROUTES
========================================== */

// Get all reviews
router.get(
  "/admin",
  protect,
  getAllTestimonials
);

// Get single review
router.get(
  "/admin/:id",
  protect,
  getTestimonialById
);

// Approve / update review
router.patch(
  "/admin/:id",
  protect,
  updateTestimonial
);

// Delete review
router.delete(
  "/admin/:id",
  protect,
  deleteTestimonial
);

export default router;