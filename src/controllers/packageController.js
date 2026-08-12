import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import {
  createPackageService,
  getAllPackagesService,
  getActivePackagesService,
  getPackageByIdService,
  updatePackageService,
  deletePackageService,
} from "../services/packageService.js";

// ==========================================
// Create Package
// ==========================================

export const createPackage = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    features,
    popular,
    imageUrl,
    isActive,
  } = req.body;

  if (!name || price === undefined) {
    throw new ApiError(
      400,
      "Package name and price are required."
    );
  }

  if (!Array.isArray(features) || features.length === 0) {
    throw new ApiError(
      400,
      "At least one feature is required."
    );
  }

  const packageData = await createPackageService({
    name,
    price,
    description,
    features,
    popular,
    imageUrl,
    isActive,
  });

  res.status(201).json({
    success: true,
    message: "Package created successfully.",
    data: packageData,
  });
});

// ==========================================
// Get All Packages - Admin
// ==========================================

export const getAllPackages = asyncHandler(
  async (req, res) => {
    const packages = await getAllPackagesService();

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  }
);

// ==========================================
// Get Active Packages - Public
// ==========================================

export const getActivePackages = asyncHandler(
  async (req, res) => {
    const packages = await getActivePackagesService();

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages,
    });
  }
);

// ==========================================
// Get Package By ID
// ==========================================

export const getPackageById = asyncHandler(
  async (req, res) => {
    const packageData =
      await getPackageByIdService(req.params.id);

    if (!packageData) {
      throw new ApiError(
        404,
        "Package not found."
      );
    }

    res.status(200).json({
      success: true,
      data: packageData,
    });
  }
);

// ==========================================
// Update Package
// ==========================================

export const updatePackage = asyncHandler(
  async (req, res) => {
    const packageData =
      await updatePackageService(
        req.params.id,
        req.body
      );

    if (!packageData) {
      throw new ApiError(
        404,
        "Package not found."
      );
    }

    res.status(200).json({
      success: true,
      message: "Package updated successfully.",
      data: packageData,
    });
  }
);

// ==========================================
// Delete Package
// ==========================================

export const deletePackage = asyncHandler(
  async (req, res) => {
    const packageData =
      await deletePackageService(
        req.params.id
      );

    if (!packageData) {
      throw new ApiError(
        404,
        "Package not found."
      );
    }

    res.status(200).json({
      success: true,
      message: "Package deleted successfully.",
    });
  }
);