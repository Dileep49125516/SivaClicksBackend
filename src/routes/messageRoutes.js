import express from "express";

import {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/messageController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

/* ==========================================
   Public Route
   Customer sends message
========================================== */

router.post("/", createMessage);

/* ==========================================
   Protected Admin Routes
========================================== */

router.get("/", protect, getAllMessages);

router.get("/:id", protect, getMessageById);

router.patch(
  "/:id/status",
  protect,
  updateMessageStatus
);

router.delete(
  "/:id",
  protect,
  deleteMessage
);

export default router;