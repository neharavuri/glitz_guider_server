import model from "./model.js";
export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>{
    let res = model.findOne({ username, password });
    console.log(res);
    return res;
};
export const findInfluencers = () => model.find({role: "influencer"});
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const addFollower = (follower, influencer) => model.updateOne(
  { _id: influencer._id }, 
  { $push: { followers: follower.username } }
);
export const addFollowing = (follower, influencer) => model.updateOne(
  { _id: follower._id }, 
  { $push: { following: influencer.username } }
);