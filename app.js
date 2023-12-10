import express from "express";
import Search from "./Search.js";
import cors from "cors";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import BlogRoutes from "./reviews/routes.js";
import session from "express-session";
import DiscussionRoutes from "./discussion/routes.js";
mongoose.connect(
  "mongodb+srv://neha:ravuri@kanbas.xggi1tt.mongodb.net/glitz_guide?retryWrites=true&w=majority"
);
const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));
Search(app);
UserRoutes(app);
BlogRoutes(app);
DiscussionRoutes(app);
app.listen(4000);
