import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  likedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  likable: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "on_model",
  },
  on_model: {
    type: String,
    enum: {
      values: ["post", "comment"],
      message: "{VALUE} is not supported",
    },
  },
});
