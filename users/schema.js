import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    avatar: String,
    email: String,
    instagram: String,
    website: String,
    bio: String,
    role: {
      type: String,
      enum: ["follower", "influencer"],
      default: "follower" },
  },
  { collection: "users" });
export default userSchema;

