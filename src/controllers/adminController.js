import asyncHandler from "../middlewares/asyncHandler.js";
import Admin from "../models/Admin.js";
import {
  registerAdminService,
  loginAdminService,
  updateAdminProfileService,
  changeAdminPasswordService,
} from "../services/adminService.js";
/* ===========================
   Register Admin
=========================== */

export const registerAdmin = asyncHandler(async (req, res) => {
  const { admin, token } = await registerAdminService(req.body);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "Admin registered successfully",
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    },
  });
});

/* ===========================
   Login Admin
=========================== */

export const loginAdmin = asyncHandler(async (req, res) => {
  const { admin, token } = await loginAdminService(req.body);

  res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  res.status(200).json({
    success: true,
    message: "Login successful",
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    },
  });
});

/* ===========================
   Logout Admin
=========================== */

export const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select("-password");

  res.status(200).json({
    success: true,
    admin,
  });
});

// ==========================================
// Update Admin Profile
// ==========================================

export const updateAdminProfile = asyncHandler(
  async (req, res) => {
    const admin = await updateAdminProfileService(
      req.admin.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  }
);


// ==========================================
// Change Admin Password
// ==========================================

export const changeAdminPassword = asyncHandler(
  async (req, res) => {
    await changeAdminPasswordService(
      req.admin.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  }
);