import express from "express";

import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";

import {
  bookingValidationRules,
  validateBooking,
} from "../middlewares/validateBooking.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  bookingValidationRules,
  validateBooking,
  createBooking
);

router.get("/",protect, getAllBookings);

router.get("/:id",protect, getBookingById);

router.patch("/:id/status", protect, updateBookingStatus);

router.delete("/:id",protect, deleteBooking);

export default router;