import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Book from "../models/Books.js";

const router = express.Router();

/* ================= ADD STUDENT ================= */
router.post("/add-student", async (req, res) => {
  try {
    const { rollNo, name, branch, password } = req.body;

    const existing = await User.findOne({ rollNo });
    if (existing) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const student = new User({
      role: "student",
      rollNo,
      name,
      branch,
      password: hashed,
    });

    await student.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADD BOOK ================= */
router.post("/add-book", async (req, res) => {
  try {
    const { title, author, image, quantity } = req.body;

    const book = new Book({
      title,
      author,
      image,
      quantity: quantity || 0,
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= UPDATE BOOK QUANTITY ================= */
router.patch("/update-quantity/:bookId", async (req, res) => {
  try {
    const { quantity } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.bookId,
      { quantity },
      { new: true }
    );

    res.json(book);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= ADMIN REQUESTS ================= */
router.get("/requests", async (req, res) => {
  const requests = await Cart.find({ status: "cart" }).populate("bookId");
  res.json(requests);
});

/* ================= APPROVE ================= */
router.patch("/approve/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    const book = await Book.findById(cart.bookId);

    if (!book || book.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    book.quantity -= 1;
    cart.status = "approved";

    await book.save();
    await cart.save();

    res.json({ message: "Approved successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= REJECT ================= */
router.patch("/reject/:cartId", async (req, res) => {
  await Cart.findByIdAndUpdate(req.params.cartId, {
    status: "rejected",
  });

  res.json({ message: "Rejected successfully" });
});

/* ================= RETURN ================= */
router.patch("/return/:cartId", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    const book = await Book.findById(cart.bookId);

    book.quantity += 1;
    cart.status = "returned";

    await book.save();
    await cart.save();

    res.json({ message: "Returned successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;