import asyncHandler from "../middlewares/asyncHandler.js";
import { getDashboardStatsService } from "../services/dashboardService.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStatsService();

  res.status(200).json({
    success: true,
    stats,
  });
});