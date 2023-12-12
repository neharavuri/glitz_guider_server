import * as dao from "./dao.js";
import * as userDao from "../users/dao.js";
function DiscussionRoutes(app) {
    const getPosts = async (req,res) => {
        let posts = await dao.findAllPosts();
        posts = await Promise.all(posts.map(async function (post) {
            const user = await userDao.findUserByUsername(post.username);
            return {_id: post._id, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar,
            username: post.username, title: post.title, body: post.body};
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
        const post = await dao.updatePost(id, req.body);
        res.json(post);
    }
    const deletePost = async (req, res) => {
        const {id} = req.params;
        const status = await dao.deletePost(id);
        res.json(status);
    }
    app.get("/discussion", getPosts);
    app.post("/discussion/new/:username", writePost);
    app.put("/discussion/:id", updatePost);
    app.delete("/discussion/:id", deletePost);
}
export default DiscussionRoutes;