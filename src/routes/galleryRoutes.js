import express from "express";

import {
  createGallery,
  getAllGallery,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controllers/galleryController.js";

import upload from "../middlewares/upload.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ==========================
   Gallery Routes
========================== */

router.post(
  "/",
  protect,
  upload.single("image"),
  createGallery
);

router.get("/", getAllGallery);

router.get("/:id", getGalleryById);

router.patch("/:id",protect, updateGallery);

router.delete("/:id",protect, deleteGallery);

export default router;