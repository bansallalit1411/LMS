import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: String,
    author: String,
    image: String,
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", BookSchema);