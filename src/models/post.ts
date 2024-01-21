import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    filename: String,
    body: String,
    author: { type: String, default: "rohan" },
  },
  { timestamps: true }
);

export const postModel =
  mongoose.models.Post || mongoose.model("Post", PostSchema);
