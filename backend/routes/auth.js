import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

/* ================= REGISTER ================= */
router.post("/register", async (req, res) => {
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

    res.status(201).json({ message: "Account created successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { rollNo, adminId, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    let user;

    // ADMIN LOGIN
    if (adminId) {
      user = await User.findOne({ adminId, role: "admin" });

      if (!user) {
        return res.status(404).json({ message: "Admin does not exist" });
      }
    }

    // STUDENT LOGIN
    else if (rollNo) {
      user = await User.findOne({ rollNo, role: "student" });

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }
    }

    else {
      return res.status(400).json({ message: "Invalid login data" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is wrong" });
    }

    res.json({
      _id: user._id,
      role: user.role,
      rollNo: user.rollNo,
      adminId: user.adminId,
      name: user.name,
    });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;