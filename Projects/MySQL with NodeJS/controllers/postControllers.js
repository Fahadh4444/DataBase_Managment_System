const Post = require('../models/Post');

exports.getAllPosts = async (req,res,next) => {
    try {
        const [posts, _] = await Post.findAll();
        res.status(200).json({const: posts.length, posts});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.createNewPost = async (req,res,next) => {
    try {
        let {title,body} = req.body;
        let post = new Post(title,body);

        post = await post.save();

        res.status(201).json({message: "SUCCESSFULLY POST CREATED"});
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getPostById = async (req,res,next) => {
    try {
        let postId = req.params.id;
        let [post,_] = await Post.findById(postId);

        res.status(201).json({post});
    } catch (error) {
        console.log(error);
        next(error);
    }
}