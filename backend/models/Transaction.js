import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  },
  status: {
    type: String,
    enum: ["issued", "returned"],
    default: "issued"
  }
}, { timestamps: true });

export default mongoose.model("Transaction", TransactionSchema);
