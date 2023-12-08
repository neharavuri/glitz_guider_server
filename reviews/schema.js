import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    username: String,
    pid: String,
    review: String,
  },
  { collection: "reviews" });
export default reviewSchema;

