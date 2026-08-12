import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import cloudinary from "../config/cloudinary.js";

import {
  createGalleryService,
  getAllGalleryService,
  getGalleryByIdService,
  updateGalleryService,
  deleteGalleryService,
} from "../services/galleryService.js";

/* ==========================================
   Create Gallery Image
========================================== */

export const createGallery = asyncHandler(
  async (req, res) => {
    // Check image
    if (!req.file) {
      throw new ApiError(
        400,
        "Please upload an image."
      );
    }

    const {
      title,
      category,
      description,
    } = req.body;

    // Upload image to Cloudinary
    const result = await new Promise(
      (resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder: "naturalclicks/gallery",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

        uploadStream.end(req.file.buffer);
      }
    );

    // Save gallery information in MongoDB
    const gallery =
      await createGalleryService({
        title,
        category,
        description,
        imageUrl: result.secure_url,
        publicId: result.public_id,
      });

    res.status(201).json({
      success: true,
      message:
        "Gallery image uploaded successfully.",
      data: gallery,
    });
  }
);


/* ==========================================
   Get All Gallery Images
========================================== */

export const getAllGallery = asyncHandler(
  async (req, res) => {
    const galleries =
      await getAllGalleryService();

    res.status(200).json({
      success: true,
      count: galleries.length,
      data: galleries,
    });
  }
);


/* ==========================================
   Get Gallery Image By ID
========================================== */

export const getGalleryById = asyncHandler(
  async (req, res) => {
    const gallery =
      await getGalleryByIdService(
        req.params.id
      );

    if (!gallery) {
      throw new ApiError(
        404,
        "Gallery image not found."
      );
    }

    res.status(200).json({
      success: true,
      data: gallery,
    });
  }
);


/* ==========================================
   Update Gallery Image
========================================== */

export const updateGallery = asyncHandler(
  async (req, res) => {
    const gallery =
      await updateGalleryService(
        req.params.id,
        req.body
      );

    if (!gallery) {
      throw new ApiError(
        404,
        "Gallery image not found."
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Gallery image updated successfully.",
      data: gallery,
    });
  }
);


/* ==========================================
   Delete Gallery Image
========================================== */

export const deleteGallery = asyncHandler(
  async (req, res) => {
    // First find the gallery image
    const gallery =
      await getGalleryByIdService(
        req.params.id
      );

    if (!gallery) {
      throw new ApiError(
        404,
        "Gallery image not found."
      );
    }

    // Delete image from Cloudinary
    if (gallery.publicId) {
      await cloudinary.uploader.destroy(
        gallery.publicId
      );
    }

    // Delete image from MongoDB
    await deleteGalleryService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Gallery image deleted successfully.",
    });
  }
);