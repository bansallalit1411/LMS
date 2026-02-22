import express from "express";
import multer from "multer";
import Book from "../models/Books.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + file.originalname)
});
const upload = multer({ storage });

/* ADD BOOK */
router.post("/", upload.single("image"), async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    image: req.file.filename
  });
  await book.save();
  res.json("Book added");
});

/* GET BOOKS */
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

/* DELETE BOOK */
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json("Book deleted");
});

export default router;
