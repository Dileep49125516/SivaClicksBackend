import Booking from "../models/Booking.js";
import Gallery from "../models/Gallery.js";
import Package from "../models/Package.js";

export const getDashboardStatsService = async () => {
  const totalBookings =
    await Booking.countDocuments();

  const pendingBookings =
    await Booking.countDocuments({
      status: "Pending",
    });

  const galleryImages =
    await Gallery.countDocuments();

  const packages =
    await Package.countDocuments();

  const recentBookings =
    await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5);

  return {
    totalBookings,
    pendingBookings,
    recentBookings,
    galleryImages,
    packages,
  };
};