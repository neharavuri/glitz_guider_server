import model from "./model.js";
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = async (username, password) =>{
    let res = await model.findOne({ username, password }).exec();
    console.log(res);
};
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });