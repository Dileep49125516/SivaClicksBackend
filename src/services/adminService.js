import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

/* ===========================
   Register Admin
=========================== */

export const registerAdminService = async ({
  name,
  email,
  password,
}) => {
  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    throw new ApiError(400, "Admin already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  return {
    admin,
    token: generateToken(admin._id),
  };
};

/* ===========================
   Login Admin
=========================== */

export const loginAdminService = async ({
  email,
  password,
}) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  return {
    admin,
    token: generateToken(admin._id),
  };
};

// ==========================================
// Update Admin Profile
// ==========================================

export const updateAdminProfileService = async (
  adminId,
  { name, email }
) => {
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Check email only if it is being changed
  if (email && email !== admin.email) {
    const existingAdmin = await Admin.findOne({
      email,
      _id: { $ne: adminId },
    });

    if (existingAdmin) {
      throw new ApiError(
        400,
        "Email is already in use"
      );
    }

    admin.email = email;
  }

  if (name) {
    admin.name = name;
  }

  await admin.save();

  return admin;
};


// ==========================================
// Change Admin Password
// ==========================================

export const changeAdminPasswordService = async (
  adminId,
  { currentPassword, newPassword }
) => {
  const admin = await Admin.findById(adminId);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Verify current password
  const isMatch = await bcrypt.compare(
    currentPassword,
    admin.password
  );

  if (!isMatch) {
    throw new ApiError(
      400,
      "Current password is incorrect"
    );
  }

  // Prevent same password
  const samePassword = await bcrypt.compare(
    newPassword,
    admin.password
  );

  if (samePassword) {
    throw new ApiError(
      400,
      "New password must be different from current password"
    );
  }

  // Hash new password
  admin.password = await bcrypt.hash(
    newPassword,
    10
  );

  await admin.save();

  return admin;
};