import { response } from "express";
import * as dao from "./dao.js";
function BlogRoutes(app) {
  const deletePost = async (req, res) => {
    const status = await dao.deletePost(req.params.postId);
    res.json(status);
  };

  const findAllPostsByUsername = async (req, res) => {
    const users = await dao.findPostByUsername(req.params.username);
    res.json(users);
  };

  const findAllPosts = async (req, res) => {
    const users = await dao.findAllPosts();
    res.json(users);
  };

  const createPost = async (req, res) => {
    const post = dao.createPost(req.body);
    res.json(post);
  }

  app.post("/post/new", createPost);
  app.get("/posts/:username", findAllPostsByUsername);
  app.get("/posts", findAllPosts);
  app.delete("/post/:postId", deletePost);
}
export default BlogRoutes;
