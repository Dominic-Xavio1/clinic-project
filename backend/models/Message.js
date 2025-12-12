import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // recipient
  content: { type: String, required: true, trim: true },
  referral: { type: String, trim: true }, // recommended hospital/next steps
  status: { type: String, enum: ["open", "responded", "closed"], default: "open" },
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;

