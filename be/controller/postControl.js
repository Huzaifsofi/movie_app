const Post = require('../model/postModel');
const User = require('../model/userModel');

const createPost = async (req, res) => {
    const { name, reating } = req.body;
    const user  = req.user.id;

    if (!user) {
        return res.json({ message: 'not lodded in' })
    }

    const usernamesearch = await User.findById(user);
    const username = usernamesearch.name;
    const movieid = req.params.id;

    let posts;
    try {
        posts = new Post({
            name,
            reating,
            user,
            username,
            movieid
        })
        await posts.save()
    } catch (err) {
        console.log(err)
    }
    if (!posts) {
        return res.status(400).json({ message: 'unable to post' })
    }
    return res.status(201).json({ posts })
}

const getPosts = async (req, res) => {
    let posts;
    try {
        posts = await Post.find().populate('user').populate('movieid')
    } catch (err) {
        console.log(err)
    }
    if (!posts) {
        return res.status(400).json({ message: 'unable to post' })
    }
    return res.status(201).json({ posts })
}


exports.createPost = createPost
exports.getPosts = getPosts