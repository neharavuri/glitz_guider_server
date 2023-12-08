import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("blog_posts", schema);
export default model;
