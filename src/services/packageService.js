import Package from "../models/Package.js";

// ==========================================
// Create Package
// ==========================================

export const createPackageService = async (packageData) => {
  const newPackage = await Package.create(packageData);

  return newPackage;
};

// ==========================================
// Get All Packages
// ==========================================

export const getAllPackagesService = async () => {
  const packages = await Package.find()
    .sort({ createdAt: -1 });

  return packages;
};

// ==========================================
// Get Active Packages
// ==========================================

export const getActivePackagesService = async () => {
  const packages = await Package.find({
    isActive: true,
  }).sort({ createdAt: -1 });

  return packages;
};

// ==========================================
// Get Package By ID
// ==========================================

export const getPackageByIdService = async (id) => {
  const packageData = await Package.findById(id);

  return packageData;
};

// ==========================================
// Update Package
// ==========================================

export const updatePackageService = async (
  id,
  packageData
) => {
  const updatedPackage = await Package.findByIdAndUpdate(
    id,
    packageData,
    {
      new: true,
      runValidators: true,
    }
  );

  return updatedPackage;
};

// ==========================================
// Delete Package
// ==========================================

export const deletePackageService = async (id) => {
  const deletedPackage = await Package.findByIdAndDelete(id);

  return deletedPackage;
};