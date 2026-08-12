import Testimonial from "../models/Testimonial.js";

/* ==========================================
   Create Testimonial
========================================== */

export const createTestimonialService = async ({
  name,
  email,
  rating,
  review,
  service,
}) => {
  const testimonial = await Testimonial.create({
    name,
    email,
    rating,
    review,
    service,
    approved: false,
  });

  return testimonial;
};

/* ==========================================
   Get Approved Testimonials
========================================== */

export const getApprovedTestimonialsService =
  async () => {
    const testimonials =
      await Testimonial.find({
        approved: true,
      }).sort({
        createdAt: -1,
      });

    return testimonials;
  };

/* ==========================================
   Get All Testimonials - Admin
========================================== */

export const getAllTestimonialsService =
  async () => {
    const testimonials =
      await Testimonial.find().sort({
        createdAt: -1,
      });

    return testimonials;
  };

/* ==========================================
   Get Testimonial By ID
========================================== */

export const getTestimonialByIdService =
  async (id) => {
    const testimonial =
      await Testimonial.findById(id);

    return testimonial;
  };

/* ==========================================
   Update Testimonial
========================================== */

export const updateTestimonialService =
  async (id, updateData) => {
    const testimonial =
      await Testimonial.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    return testimonial;
  };

/* ==========================================
   Delete Testimonial
========================================== */

export const deleteTestimonialService =
  async (id) => {
    const testimonial =
      await Testimonial.findByIdAndDelete(id);

    return testimonial;
  };