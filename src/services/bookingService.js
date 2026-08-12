import Booking from "../models/Booking.js";

/* ===========================
   Create Booking
=========================== */

export const createBookingService = async (bookingData) => {
  return await Booking.create(bookingData);
};

/* ===========================
   Get All Bookings
=========================== */

export const getAllBookingsService = async () => {
  return await Booking.find().sort({ createdAt: -1 });
};

/* ===========================
   Get Booking By ID
=========================== */

export const getBookingByIdService = async (id) => {
  return await Booking.findById(id);
};

/* ===========================
   Update Booking Status
=========================== */

export const updateBookingStatusService = async (
  id,
  status
) => {
  return await Booking.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );
};

/* ===========================
   Delete Booking
=========================== */

export const deleteBookingService = async (id) => {
  return await Booking.findByIdAndDelete(id);
};