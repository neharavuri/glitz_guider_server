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
    req.session["currentUser"] = updatedUser;
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
    res.json({firstName: user.firstName, lastName: user.lastName, avatar: user.avatar, username: user.username, role: user.role, bio: user.bio, website: user.website, instagram: user.instagram});
  }

  const getPublicUsername = async (req,res) => {
    const {username} = req.params;
    const user = await dao.findUserByUsername(username);
    if (user) {
      res.json({firstName: user.firstName, lastName: user.lastName, avatar: user.avatar, username: user.username, role: user.role, bio: user.bio, website: user.website, instagram: user.instagram});
    }
    else {
      res.status(400).json("Username not found");
    }
  }

  const addFollower = async (req, res) => {
    const {influencer} = req.params;
    const influencerUser = await dao.findUserByUsername(influencer);
    const user = req.session["currentUser"];
    const status = await dao.addFollower(user, influencerUser);
    const secStatus = await dao.addFollowing(user, influencerUser);
    const update = await dao.findUserByUsername(user.username);
    req.session["currentUser"] = update;
    res.json(status);
  }

  const removeFollowing = async (req, res) => {
    const {influencer} = req.params;
    const influencerUser = await dao.findUserByUsername(influencer);
    const user = req.session["currentUser"];
    const status = await dao.removeFollower(user, influencerUser);
    const secStatus = await dao.removeFollowing(user, influencerUser);
    const update = await dao.findUserByUsername(user.username);
    req.session["currentUser"] = update;
    res.json(status);
  }

  const getFollowing = async (req, res) => {
    const {username} = req.params;
    const user = await dao.findUserByUsername(username);
    if (user) {
        const results = await Promise.all(user.following.map(async function (f) {
        const user = await dao.findUserByUsername(f);
        return {firstName: user.firstName, lastName: user.lastName, avatar: user.avatar, username: user.username, bio: user.bio};
      }));
      res.json(results);
    }
    else {
      res.status(400).json("username not found");
    }
  }

  const getFollowers = async (req,res) => {
    const {username} = req.params;
    const user = await dao.findUserByUsername(username);
    if (user) {
      res.json(user.followers);
    }
    else {
      res.status(400).json("username not found");
    }
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
  app.post("/follow/:influencer", addFollower);
  app.get("/following/:username", getFollowing);
  app.get("/followers/:username", getFollowers);
  app.post("/unfollow/:influencer", removeFollowing);
}
export default UserRoutes;
