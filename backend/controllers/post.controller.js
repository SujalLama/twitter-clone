const Post = require('../models/post.model');
const User = require('../models/user.model');
const upload = require("../middleware/fileUpload");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')

// @desc    Get posts by all user
// @route   GET /api/v1/posts
// @access  Public

exports.getAllPosts = asyncHandler(async (req, res, next) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;


    if(req.query.comment) {
        const posts = await Post.find({"comments.postedBy": req.query.comment}).populate('comments.postedBy').sort({created: -1});
        const total = posts.length;
        return (  res.status(200).json({
        success: true,
        total,
        data: posts,
    }))
    }

    const count = await Post.count({})
    const posts = await Post.find(req.query).populate('postedBy').sort({created: -1})
    .limit(pageSize).skip(pageSize * (page -1));
    const total = posts.length;

    res.status(200).json({
        success: true,
        total,
        data: {posts, page, pages: Math.ceil(count / pageSize)}
    })
})

// @desc    Get single post
// @route   GET /api/v1/posts/:id
// @access  Public

exports.getSinglePost = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const post = await Post.findById(id).populate('postedBy')
    .populate('comments.postedBy');

    if(!post) {
        return next(new ErrorResponse(`Posts not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        data: post
    })
})

// @desc    Create a post
// @route   POST /api/v1/posts
// @access  Private

exports.createPost = asyncHandler(async (req, res, next) => {
    // Add user to req.body
        req.body.postedBy = req.user.id;

    const post = await Post.create(req.body);

    res.status(200).json({
        success: true,
        data: post
    }) 
})

// @desc    Update a post
// @route   PUT /api/v1/posts/:id
// @access  Private

exports.updatePost = asyncHandler(async (req, res, next) => {
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
})

// @desc    Delete a post
// @route   DELETE /api/v1/posts/:id
// @access  Private

exports.deletePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    // Make sure user is post owner
    if(post.postedBy.toString() !== req.user.id) {
        return res.status(401).json({message: 'Not authorized to delete post.'});
    }

    await Post.findByIdAndRemove(req.params.id);
    
    res.status(200).json({
        success: true,
        data: {}
    })    
})

// @desc    Upload photo for bootcamp
// @route   PUT /api/v1/posts/:id/photo
// @access  Private

exports.postPhotoUpload = asyncHandler(async (req, res, next) => {
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
})

// @desc    Like post by all user
// @route   PUT /api/v1/posts/like
// @access  Public

exports.likePost = asyncHandler(async (req, res, next) => {
    const {postId, userId} = req.body;
    const post = await Post.findById(postId);

    if(post.likes.includes(userId)) {
        post.likes.pull(userId);
        await post.save();
    } else {
        await Post.findByIdAndUpdate(postId, {$addToSet: {likes: [userId]}})
    }
        
    res.status(200).json({
        success: true,
    })
})

// @desc    comment post by all user
// @route   PUT /api/v1/posts/comment
// @access  Public

exports.commentPost = asyncHandler(async (req, res, next) => {
    const {postId, userId, text} = req.body;
    // const post = await Post.findById(postId);

        await Post.findByIdAndUpdate(postId, {$addToSet: {comments: [{
            text,
            postedBy: userId
        }]}})

    res.status(200).json({
        success: true,
    })
})