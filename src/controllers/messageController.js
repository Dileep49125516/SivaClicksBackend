import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

import {
  createMessageService,
  getAllMessagesService,
  getMessageByIdService,
  updateMessageStatusService,
  deleteMessageService,
} from "../services/messageService.js";

/* ==========================================
   Create Message
========================================== */

export const createMessage = asyncHandler(
  async (req, res) => {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    if (!name || !email || !subject || !message) {
      throw new ApiError(
        400,
        "Name, email, subject and message are required."
      );
    }

    const newMessage =
      await createMessageService({
        name,
        email,
        phone,
        subject,
        message,
      });

    res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: newMessage,
    });
  }
);

/* ==========================================
   Get All Messages
========================================== */

export const getAllMessages = asyncHandler(
  async (req, res) => {
    const messages =
      await getAllMessagesService();

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  }
);

/* ==========================================
   Get Message By ID
========================================== */

export const getMessageById = asyncHandler(
  async (req, res) => {
    const message =
      await getMessageByIdService(
        req.params.id
      );

    if (!message) {
      throw new ApiError(
        404,
        "Message not found."
      );
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  }
);

/* ==========================================
   Update Message Status
========================================== */

export const updateMessageStatus =
  asyncHandler(async (req, res) => {
    const { status } = req.body;

    if (!["Unread", "Read"].includes(status)) {
      throw new ApiError(
        400,
        "Invalid message status."
      );
    }

    const message =
      await updateMessageStatusService(
        req.params.id,
        status
      );

    if (!message) {
      throw new ApiError(
        404,
        "Message not found."
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Message status updated successfully.",
      data: message,
    });
  });

/* ==========================================
   Delete Message
========================================== */

export const deleteMessage = asyncHandler(
  async (req, res) => {
    const message =
      await deleteMessageService(
        req.params.id
      );

    if (!message) {
      throw new ApiError(
        404,
        "Message not found."
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Message deleted successfully.",
    });
  }
);