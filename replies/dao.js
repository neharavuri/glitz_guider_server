import model from "./model.js";
export const createReview = (review) => model.create(review);
export const findRepliesByDiscussionId = (did) =>
  model.find({ discussionId: did });
export const deleteReply = (replyId) => model.deleteOne({ _id: replyId });
export const updatePost = (id, review) =>
  model.updateOne({ _id: id }, { $set: review });
