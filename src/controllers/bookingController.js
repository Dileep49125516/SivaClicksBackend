import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingStatusService,
  deleteBookingService,
} from "../services/bookingService.js";

/* ==========================================
   Create Booking
========================================== */

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await createBookingService(req.body);

  res.status(201).json({
    success: true,
    message: "Booking created successfully.",
    data: booking,
  });
});

/* ==========================================
   Get All Bookings
========================================== */

export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await getAllBookingsService();

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});

/* ==========================================
   Get Booking By ID
========================================== */

export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await getBookingByIdService(req.params.id);

  if (!booking) {
    throw new ApiError("Booking not found.", 404);
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

/* ==========================================
   Update Booking Status
========================================== */

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await updateBookingStatusService(
    req.params.id,
    req.body.status
  );

  if (!booking) {
    throw new ApiError("Booking not found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Booking updated successfully.",
    data: booking,
  });
});

/* ==========================================
   Delete Booking
========================================== */

export const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await deleteBookingService(req.params.id);

  if (!booking) {
    throw new ApiError("Booking not found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Booking deleted successfully.",
  });
});