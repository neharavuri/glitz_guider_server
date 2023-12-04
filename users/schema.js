import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    role: {
      type: String,
      enum: ["FOLLOWER", "INFLUENCER"],
      default: "USER" },
  },
  { collection: "users" });
export default userSchema;

