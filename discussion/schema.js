import mongoose from "mongoose";
const discussionSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    avatar: String,
    title: String,
    body: String
  },
  { collection: "discussion" });
export default discussionSchema;

