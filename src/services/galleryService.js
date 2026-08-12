import Gallery from "../models/Gallery.js";

// ==========================
// Create Gallery Image
// ==========================

export const createGalleryService = async (data) => {
  const gallery = await Gallery.create(data);

  return gallery;
};

// ==========================
// Get All Gallery Images
// ==========================

export const getAllGalleryService = async () => {
  const galleries = await Gallery.find()
    .sort({ createdAt: -1 });

  return galleries;
};

// ==========================
// Get Gallery Image By ID
// ==========================

export const getGalleryByIdService = async (id) => {
  const gallery = await Gallery.findById(id);

  return gallery;
};

// ==========================
// Update Gallery Image
// ==========================

export const updateGalleryService = async (id, data) => {
  const gallery = await Gallery.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  return gallery;
};

// ==========================
// Delete Gallery Image
// ==========================

export const deleteGalleryService = async (id) => {
  const gallery = await Gallery.findByIdAndDelete(id);

  return gallery;
};