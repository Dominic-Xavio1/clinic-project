import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, to } = req.body;
    if (!to) {
      return res.status(400).json({ success: false, message: "Recipient is required" });
    }
    const message = await Message.create({
      from: req.userId,
      to,
      content,
    });

    const populated = await message.populate([
      { path: "from", select: "name email role" },
      { path: "to", select: "name email role" },
    ]);

    const io = req.app.get("io");
    if (io) {
      io.to(String(to)).emit("message:new", populated);
      io.to(String(req.userId)).emit("message:new", populated);
    }

    res.status(201).json({ success: true, message: populated });
  } catch (err) {
    console.error("Error sending message", err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

export const listMessages = async (req, res) => {
  try {
    const { with: withUser } = req.query;
    let filter = {};
    if (withUser) {
      filter = {
        $or: [
          { from: req.userId, to: withUser },
          { from: withUser, to: req.userId },
        ],
      };
    } else {
      filter = {
        $or: [{ from: req.userId }, { to: req.userId }],
      };
    }

    const messages = await Message.find(filter)
      .populate("from", "name email role")
      .populate("to", "name email role")
      .sort({ createdAt: 1 });
    res.json({ success: true, messages });
  } catch (err) {
    console.error("Error fetching messages", err);
    res.status(500).json({ success: false, message: "Failed to fetch messages" });
  }
};

