import { response } from "express";
import * as dao from "./dao.js";
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
    //const {pid} = req.params;

    const reviews = await dao.findReviewsByProductId("1048");
    console.log(reviews);
    res.json(reviews);
  }

  const deleteReview = async (req, res) => {
    const {id} = req.params;
    const rev = await dao.deleteReview(id);
    res.json(rev);
  }


  app.get("/reviews", getReviews);
  app.get("/reviews/:username", getReviewsByUsername);
  app.post("/reviews/new", writeReview);
  app.get("/reviews/product/:pid", getReviewsByProduct);
  app.delete("/reviews/:id", deleteReview);
}
export default BlogRoutes;
