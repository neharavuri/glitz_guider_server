import * as dao from "./dao.js";
import * as userDao from "../users/dao.js";
function ReplyRoutes(app) {
    const getReplies = async (req,res) => {
        const {did} = req.params;
        const replies = await dao.findRepliesByDiscussionId(did);
        const result = await Promise.all(replies.map(
            async function (r) {
                const username = r.username;
                const user = await userDao.findUserByUsername(username);
                return ({_id: r._id, discussionId: r.discussionId, reply: r.reply, username: user.username,
                    firstName: user.firstName, lastName: user.lastName})
            }
        ))
        res.json(result);
      }
    const writeReply = async (req, res) => {
        const {did} = req.params;
        const reply = dao.createReview(req.body);
        res.json(reply);
    }
    const updateReply = async (req, res) => {
        const {rid} = req.params;
        const reply = await dao.updatePost(rid, req.body);
        res.json(reply);
    }
    const deleteReply = async (req, res) => {
        const {id} = req.params;
        const status = await dao.deleteReply(id);
        res.json(status);
    }
    app.get("/replies/:did", getReplies);
    app.post("/replies/:did", writeReply);
    app.put("/replies/:rid", updateReply);
    app.delete("/replies/:id", deleteReply);

}
export default ReplyRoutes;