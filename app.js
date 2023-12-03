import express from 'express';
import Search from "./Search.js";
const app = express()
Search(app)
app.listen(4000)