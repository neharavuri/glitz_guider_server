import * as dao from "./dao.js";
import * as userDao from "../users/dao.js";
function DiscussionRoutes(app) {
    const getPosts = async (req,res) => {
        const posts = await dao.findAllPosts();
        res.json(posts);
      }
    const writePost = async (req, res) => {
        const {username} = req.params;
        const user = userDao.findUserByUsername(username);
        const add = {firstName: user.firstName, lastName: user.lastName, avatar: user.avatar};
        const newBody = {
            ...add,
            ...req.body
        };
        const post = dao.createPost(newBody);
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