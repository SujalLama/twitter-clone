const Post = require('../models/post.model');
const User = require('../models/user.model');
const upload = require("../middleware/fileUpload");

// @desc    Get posts by all user
// @route   GET /api/v1/posts
// @access  Public

exports.getAllPosts = async (req, res, next) => {
    try {
    const posts = await Post.find().populate('postedBy');
    const total = posts.length;

    res.status(200).json({
        success: true,
        total,
        data: posts,
    })
    } catch(err) {
        res.status(400).json(err);
    }
    
}

// @desc    Get single post
// @route   GET /api/v1/posts/:id
// @access  Public

exports.getSinglePost = async (req, res, next) => {
    try {
    const id = req.params.id;
    const post = await Post.findById(id);

    res.status(200).json({
        success: true,
        data: post
    })
    } catch(err) {
        res.status(400).json(err);
    }
    
}

// @desc    Create a post
// @route   POST /api/v1/posts
// @access  Private

exports.createPost = async (req, res, next) => {
    try {

    // Add user to req.body
        req.body.postedBy = req.user.id;

    const post = await Post.create(req.body);

    res.status(200).json({
        success: true,
        data: post
    })
    } catch(err) {
        res.status(400).json(err);
    }
    
}

// @desc    Update a post
// @route   PUT /api/v1/posts/:id
// @access  Private

exports.updatePost = async (req, res, next) => {
    try {
    const id = req.params.id;
    const newPost = req.body;
    
    const post = await Post.findById(id);

    if(!post) {
        return res.status(404).json('Post not found');
    }

    // Make sure user is post owner
    if(post.postedBy.toString() !== req.user.id) {
        return res.status(401).json('Not authorized to update post.');
    }

     const newpost = await Post.findByIdAndUpdate(id, newPost, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: newpost
    })
    } catch(err) {
        res.status(400).json(err);
    }
    
}

// @desc    Delete a post
// @route   DELETE /api/v1/posts/:id
// @access  Private

exports.deletePost = async (req, res, next) => {
    try {
    const post = await req.findById(req.params.id);

    // Make sure user is post owner
    if(post.postedBy.toString() !== req.user.id) {
        return res.status(401).json({message: 'Not authorized to delete post.'});
    }

    await Post.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
        success: true,
        data: {}
    })

    } catch(err) {
        res.status(400).json(err);
    }
    
}

// @desc    Upload photo for bootcamp
// @route   PUT /api/v1/posts/:id/photo
// @access  Private

exports.postPhotoUpload = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json('Post not found');
        }

         // Make sure user is post owner
            if(post.postedBy.toString() !== req.user.id) {
                return next(res.status(401).json({message: 'Not authorized to add photo.'}));
            }
        
        // if (req.file == undefined) {
        // return res.status(400).send({ message: "Choose a file to upload" });
        // }
        
         await upload(req, res);
         await Post.findByIdAndUpdate(req.params.id, {photo: req.file.originalname})

         res.status(200).send({
        message: "File uploaded successfully: " + req.file.originalname,
        });
    } catch(err) {
         console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
        return res.status(500).send({
            message: "File size should be less than 5MB",
        });
        }

        res.status(500).send({
        message: `Error occured: ${err}`,
        });
    }
    
}
