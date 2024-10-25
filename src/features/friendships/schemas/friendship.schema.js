import mongoose from "mongoose";

export const friendshipSchema = new mongoose.Schema({
  userId: {
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  unfriended: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});
