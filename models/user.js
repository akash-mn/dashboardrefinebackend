import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", UserSchema);

export default User;
