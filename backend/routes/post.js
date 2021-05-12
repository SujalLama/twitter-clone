const router = require('express').Router();
const {getAllPosts, getSinglePost, deletePost, createPost, updatePost, postPhotoUpload, likePost} = require('../controllers/post.controller');
const {protect} = require('../middleware/auth');

router
    .route('/')
    .get(getAllPosts)
    .post(protect, createPost);

router
    .route('/:id/photo')
    .put(protect, postPhotoUpload);

router
    .route('/:id')
    .get(getSinglePost)
    .put(protect, updatePost)
    .delete(protect, deletePost);

module.exports = router;