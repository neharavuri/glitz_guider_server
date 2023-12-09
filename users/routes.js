import { response } from "express";
import * as dao from "./dao.js";
let currentUser = null;
function UserRoutes(app) {
  const createUser = async (req, res) => {};
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findInfluencers = async (req,res) => {
    const influencer = await dao.findInfluencers();
    res.json(influencer);
  }
  const updateUser = async (req, res) => {
    const { username } = req.params;
    const user = await dao.findUserByUsername(username);
    const status = await dao.updateUser(user.id, req.body);
    const updatedUser = await dao.findUserByUsername(username);
    res.json(updatedUser);
  };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    console.log("CURR");
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.status(200).json(currentUser);
    } else {
      res.status(404).json("");
    }
  };

  const account = async (req, res) => {
    console.log("CURR");
    console.log(req.session["currentUser"]);
    res.json(req.session["currentUser"]);
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
    } else {
      const currentUser = await dao.createUser(req.body);
      req.session["currentUser"] = currentUser;
      res.json({ username: currentUser.username, role: currentUser.role });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };

  const getPublic = async (req,res) => {
    const user = req.session["currentUser"];
    res.json({username: user.username, role: user.role, bio: user.bio, website: user.website, instagram: user.instagram});
  }

  const getPublicUsername = async (req,res) => {
    const {username} = req.params;
    const user = await dao.findUserByUsername(username);
    res.json({username: user.username, role: user.role, bio: user.bio, website: user.website, instagram: user.instagram});
  }
  //app.post("/api/users", createUser);
  app.get("/users", findAllUsers);
  //app.get("/api/users/:userId", findUserById);
  app.delete("/users/:userId", deleteUser);
  app.post("/signup", signup);
  app.post("/signin", signin);
  app.post("/signout", signout);
  app.get("/users/account", account);
  app.get("/users/public", getPublic);
  app.get("/users/public/:username", getPublicUsername);
  app.put("/users/:username", updateUser);
  app.get("/influencers", findInfluencers);
}
export default UserRoutes;
