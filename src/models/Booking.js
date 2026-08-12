import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    service: {
      type: String,
      required: true,
    },

    package: {
      type: String,
      required: true,
    },

    eventDate: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    requirements: {
      type: String,
      default: "",
      trim: true,
    },

   status: {
  type: String,
  enum: [
    "Pending",
    "Confirmed",
    "Completed",
    "Cancelled",
  ],
  default: "Pending",
},
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;