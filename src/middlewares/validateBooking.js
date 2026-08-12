import { body, validationResult } from "express-validator";

export const bookingValidationRules = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full Name is required"),

  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Enter a valid 10-digit phone number"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address"),

  body("service")
    .notEmpty()
    .withMessage("Please select a service"),

  body("package")
    .notEmpty()
    .withMessage("Please select a package"),

  body("eventDate")
    .notEmpty()
    .withMessage("Event date is required"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Event location is required"),

  body("requirements")
    .optional()
    .trim(),
];

export const validateBooking = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};