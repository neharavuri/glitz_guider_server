import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    username: String,
    pid: String,
    review: String,
    content: String
  },
  { collection: "blog_posts" });
export default reviewSchema;

