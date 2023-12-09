import { response } from "express";
import * as dao from "./dao.js";
import * as userDao from "../users/dao.js";

function BlogRoutes(app) {

  const getReviews = async (req,res) => {
    const reviews = await dao.findAllReviews();
    res.json(reviews);
  }

  const getReviewsByUsername = async (req,res) => {
    const {username} = req.params;
    const reviews = await dao.findReviewsByUsername(username);
    res.json(reviews);
  }

  const writeReview = async (req,res) => {
    const currReview = dao.createReview(req.body);
    res.json(currReview);
  }
  
  const getReviewsByProduct = async (req, res) => {
    const {pid} = req.params;
    let reviews = await dao.findReviewsByProductId(pid);
    reviews = await Promise.all(reviews.map(async function (r) {
      const username = r.username;
      const user = await userDao.findUserByUsername(username);
      return ({ username: username, review: r.review, pid: r.pid, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar });
    }));
    res.json(reviews);
  }

  const deleteReview = async (req, res) => {
    const {id} = req.params;
    const rev = await dao.deleteReview(id);
    res.json(rev);
  }

  const updateReview = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateReview(id, req.body);
    const updatedReview = await dao.findReviewById(id);
    res.json(updatedReview);
  };



  app.get("/reviews", getReviews);
  app.get("/reviews/:username", getReviewsByUsername);
  app.post("/reviews", writeReview);
  app.get("/reviews/product/:pid", getReviewsByProduct);
  app.delete("/reviews/:id", deleteReview);
  app.put("/reviews/:id", updateReview);
}
export default BlogRoutes;
