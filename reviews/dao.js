import model from "./model.js";
export const createReview = (review) => model.create(review);
export const findAllReviews = () => model.find();
export const findReviewsByUsername = (username) =>
  model.find({ username: username });
export const findReviewById = (reviewId) => model.findOne({_id: reviewId});
export const deleteReview = (reviewId) => model.deleteOne({ _id: reviewId });
export const findReviewsByProductId = (productId) => model.find({pid: productId});
