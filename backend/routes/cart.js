import express from "express";
import Cart from "../models/Cart.js";
import Book from "../models/Books.js";

const router = express.Router();

/* ADD TO CART */
router.post("/add", async (req, res) => {
  const { studentId, bookId } = req.body;

  const existing = await Cart.findOne({
    studentId,
    bookId,
    status: "cart",
  });

  if (existing) return res.json(existing);

  const item = new Cart({ studentId, bookId });
  await item.save();
  res.json(item);
});

/* REMOVE (only waiting) */
router.delete("/remove", async (req, res) => {
  const { studentId, bookId } = req.body;

  await Cart.findOneAndDelete({
    studentId,
    bookId,
    status: "cart",
  });

  res.json({ message: "Removed" });
});

/* RETURN BOOK */
router.patch("/return/:id", async (req, res) => {
  const cartItem = await Cart.findById(req.params.id);

  if (!cartItem)
    return res.status(404).json({ message: "Not found" });

  const book = await Book.findById(cartItem.bookId);

  if (book) {
    book.quantity += 1;
    await book.save();
  }

  cartItem.status = "returned";
  await cartItem.save();

  res.json({ message: "Book returned" });
});

/* STUDENT RECORD SEARCH */
router.get("/admin/student/:rollNo", async (req, res) => {
  const records = await Cart.find({
    studentId: req.params.rollNo,
  }).populate("bookId");

  res.json(records);
});

/* STUDENT DASHBOARD */
router.get("/student/:studentId", async (req, res) => {
  const items = await Cart.find({
    studentId: req.params.studentId,
  }).populate("bookId");

  res.json(items);
});

/* ADMIN REQUESTS */
router.get("/admin/requests", async (req, res) => {
  const requests = await Cart.find({
    status: "cart",
  }).populate("bookId");

  res.json(requests);
});

/* ADMIN APPROVE */
router.patch("/admin/approve/:id", async (req, res) => {
  const cartItem = await Cart.findById(req.params.id);

  if (!cartItem)
    return res.status(404).json({ message: "Not found" });

  const book = await Book.findById(cartItem.bookId);

  if (!book || book.quantity <= 0)
    return res.status(400).json({ message: "Out of stock" });

  book.quantity -= 1;
  await book.save();

  cartItem.status = "approved";
  await cartItem.save();

  res.json({ message: "Approved" });
});

/* ADMIN REJECT */
router.patch("/admin/reject/:id", async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.id, {
    status: "rejected",
  });

  res.json({ message: "Rejected" });
});

export default router;