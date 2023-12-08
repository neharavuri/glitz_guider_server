import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    content: String
  },
  { collection: "blog_posts" });
export default blogSchema;

