import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import galleryRoutes from "./routes/galleryRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import packageRoutes from "./routes/packageRoutes.js"
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";
import adminRoutes from "./routes/adminRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js"
const app = express();

/* ===========================
   Middlewares
=========================== */


const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.PUBLIC_URL,
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      // such as Postman
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    credentials: true,
  })
);

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

/* ===========================
   Health Check Route
=========================== */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Photography Studio Backend is Running 🚀",
  });
});

/* ===========================
   API Routes
=========================== */

app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/testimonials",testimonialRoutes);

/* ===========================
   Not Found Middleware
=========================== */

app.use(notFound);

/* ===========================
   Global Error Handler
=========================== */

app.use(errorHandler);

export default app;