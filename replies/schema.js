import mongoose from "mongoose";
const replySchema = new mongoose.Schema({
    username: String,
    discussionId: String,
    reply: String
  },
  { collection: "replies" });
export default replySchema;

