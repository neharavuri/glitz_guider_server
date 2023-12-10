import model from "./model.js";
export const createPost = (post) => model.create(post);
export const findAllPosts = () => model.find();
export const findPostsByUsername = (username) =>
  model.find({ username: username });
export const findPostById = (postId) => model.findOne({_id: postId});
export const deletePost = (postId) => model.deleteOne({ _id: postId });
export const updatePost = (id, post) =>
  model.updateOne({ _id: id }, { $set: post });
