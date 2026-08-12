import {
  createTestimonialService,
  getApprovedTestimonialsService,
  getAllTestimonialsService,
  getTestimonialByIdService,
  updateTestimonialService,
  deleteTestimonialService,
} from "../services/testimonialService.js";

/* ==========================================
   Create Testimonial - Public
========================================== */

export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial =
      await createTestimonialService(req.body);

    res.status(201).json({
      success: true,
      message:
        "Thank you! Your review has been submitted for approval.",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

/* ==========================================
   Get Approved Testimonials - Public
========================================== */

export const getApprovedTestimonials = async (
  req,
  res,
  next
) => {
  try {
    const testimonials =
      await getApprovedTestimonialsService();

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

/* ==========================================
   Get All Testimonials - Admin
========================================== */

export const getAllTestimonials = async (
  req,
  res,
  next
) => {
  try {
    const testimonials =
      await getAllTestimonialsService();

    res.status(200).json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    next(error);
  }
};

/* ==========================================
   Get Testimonial By ID - Admin
========================================== */

export const getTestimonialById = async (
  req,
  res,
  next
) => {
  try {
    const testimonial =
      await getTestimonialByIdService(
        req.params.id
      );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

/* ==========================================
   Update Testimonial - Admin
========================================== */

export const updateTestimonial = async (
  req,
  res,
  next
) => {
  try {
    const testimonial =
      await updateTestimonialService(
        req.params.id,
        req.body
      );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    next(error);
  }
};

/* ==========================================
   Delete Testimonial - Admin
========================================== */

export const deleteTestimonial = async (
  req,
  res,
  next
) => {
  try {
    const testimonial =
      await deleteTestimonialService(
        req.params.id
      );

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Testimonial deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};