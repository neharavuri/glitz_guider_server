import express from 'express';
import Search from "./Search.js";
import cors from "cors";
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/kanbas");
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
Search(app);
app.listen(4000)