import express from "express";
import protect from "../middlewares/authMiddleware.js";

import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
} from "../controllers/adminController.js";
const router = express.Router();

/* ===========================
   Admin Authentication Routes
=========================== */

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.post("/logout", logoutAdmin);
router.get(
  "/profile",
  protect,
  getAdminProfile
);
// ==========================================
// Admin Profile
// ==========================================

router.patch(
  "/profile",
  protect,
  updateAdminProfile
);


// ==========================================
// Change Password
// ==========================================

router.patch(
  "/profile/password",
  protect,
  changeAdminPassword
);

export default router;