import model from "./model.js";
export const createPost = (post) => model.create(post);
export const findAllPosts = () => model.find();
export const findPostsByUsername = (username) =>
  model.find({ username: username });
export const findReviewById = (reviewId) => model.findOne({_id: reviewId});
export const deleteReview = (reviewId) => model.deleteOne({ _id: reviewId });
export const findReviewsByProductId = (productId) => model.find({pid: productId});
export const updateReview = (id, review) =>
  model.updateOne({ _id: id }, { $set: review });
