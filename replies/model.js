import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("replies", schema);
export default model;
