'use strict';

import express from 'express';
let router = express.Router();

import jwtMiddleware from './middlewares/jwt';
import tag from './controllers/tags-controller';
import user from './controllers/users-controller';

// Authenticate a User.
router.route('/sign-in')
  .post(user.authenticate);

// Auth/ JWT middleware.
router.use(jwtMiddleware);

// Create and List Comments.
router.route('/posts/:post_id/comments')
  .post(user.createComment)
  .get(user.getAllComments);

// Update and Delete Comment.
router.route('/comments/:id')
  .put(user.updateComment)
  .delete(user.deleteComment);

// Create and List Posts
router.route('/posts')
  .post(user.createPost)
  .get(user.getAllPosts);

// Read, Update, and Delete Post
router.route('/posts/:id')
  .get(user.readPost)
  .put(user.updatePost)
  .delete(user.deletePost);

// List All Posts By A User
router.route('/user/:user_id/posts')
  .get(user.getPostByUser);

module.exports = router;
