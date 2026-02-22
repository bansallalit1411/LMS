import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "student"],
      required: true,
    },

    // For students
    rollNo: {
      type: String,
      unique: true,
      sparse: true,
    },

    // For admins
    adminId: {
      type: String,
      unique: true,
      sparse: true,
    },

    name: String,
    branch: String,
    password: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
