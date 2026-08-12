import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import asyncHandler from "./asyncHandler.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Please login.",
    });
  }

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  const admin = await Admin.findById(decoded.id).select("-password");

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: "Admin not found.",
    });
  }

  req.admin = admin;

  next();
});

export default protect;