import model from "./model.js";
export const createPost = (post) => model.create(post);
export const findAllPosts = () => model.find();
export const findPostByUsername = (username) =>
  model.find({ username: username });
export const deletePost = (postId) => model.deleteOne({ _id: postId });
