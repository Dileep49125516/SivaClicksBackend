import Message from "../models/Message.js";

/* ==========================================
   Create Message
========================================== */

export const createMessageService = async ({
  name,
  email,
  phone,
  subject,
  message,
}) => {
  const newMessage = await Message.create({
    name,
    email,
    phone,
    subject,
    message,
  });

  return newMessage;
};

/* ==========================================
   Get All Messages
========================================== */

export const getAllMessagesService = async () => {
  return await Message.find().sort({ createdAt: -1 });
};

/* ==========================================
   Get Message By ID
========================================== */

export const getMessageByIdService = async (id) => {
  return await Message.findById(id);
};

/* ==========================================
   Update Message Status
========================================== */

export const updateMessageStatusService = async (
  id,
  status
) => {
  return await Message.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );
};

/* ==========================================
   Delete Message
========================================== */

export const deleteMessageService = async (id) => {
  return await Message.findByIdAndDelete(id);
};