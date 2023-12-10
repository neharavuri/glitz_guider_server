import * as dao from "./dao.js";
import * as userDao from "../users/dao.js";
function DiscussionRoutes(app) {
    const getPosts = async (req,res) => {
        let posts = await dao.findAllPosts();
        posts = Promise.all(posts.map(async function (post) {
            const user = userDao.findUserByUsername(post.username);
            return {firstName: user.firstName, lastName: user.lastName, avatar: user.avatar,
            username: post.username, title: post.title, body: post.body, replies: post.replies};
        }))
        res.json(posts);
      }
    const writePost = async (req, res) => {
        const {username} = req.params;
        const user = userDao.findUserByUsername(username);
        const post = dao.createPost(req.body);
        res.json(post);
    }
    const updatePost = async (req, res) => {
        const {id} = req.params;
        const post = dao.updatePost(id, req.body);
        res.json(post);
    }
    app.get("/discussion", getPosts);
    app.post("/discussion/new/:username", writePost);
    app.put("/discussion/:id", updatePost);
}
export default DiscussionRoutes;