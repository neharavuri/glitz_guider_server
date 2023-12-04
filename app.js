import express from 'express';
import Search from "./Search.js";
const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
Search(app);
app.listen(4000)