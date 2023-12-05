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
  const findUserById = async (req, res) => {};
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    const currentUser = await dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(status);
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
      res.json(200).json({ username: currentUser.username });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.json(200);
  };
  //app.post("/api/users", createUser);
  app.get("/users", findAllUsers);
  //app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/signup", signup);
  app.post("/signin", signin);
  app.post("/signout", signout);
  app.post("/account", account);
}
export default UserRoutes;
