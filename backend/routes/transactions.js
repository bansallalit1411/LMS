import express from "express";
import Transaction from "../models/Transaction.js";
import Book from "../models/Books.js";

const router = express.Router();

/* ISSUE BOOK */
router.post("/issue", async (req, res) => {
  const { studentId, bookId } = req.body;

  await Book.findByIdAndUpdate(bookId, { available: false });

  const tx = new Transaction({ studentId, bookId });
  await tx.save();

  res.json("Book issued");
});

/* RETURN BOOK */
router.post("/return/:id", async (req, res) => {
  const tx = await Transaction.findById(req.params.id);
  tx.status = "returned";
  await tx.save();

  await Book.findByIdAndUpdate(tx.bookId, { available: true });

  res.json("Book returned");
});

export default router;

