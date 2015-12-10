'use strict';

import express from 'express';
let router = express.Router();

import jwtMiddleware from './middlewares/jwt';
import tag from './controllers/tags-controller';
import user from './controllers/users-controller';

// Authenticate A User.
router.route('/sign-in')
  .post(user.authenticate);

// Auth/ JWT middleware.
router.use(jwtMiddleware);

// Create & List Posts
router.route('/posts')
  .post(user.createPost)
  .get(user.getAllPosts);

// Read, Update, & Delete Post
router.route('/posts/:id')
  .get(user.readPost)
  .put(user.updatePost)
  .delete(user.deletePost);

// Create & List Comments.
router.route('/posts/:post_id/comments')
  .post(user.createComment)
  .get(user.getAllComments);

// Update & Delete Comment.
router.route('/comments/:id')
  .put(user.updateComment)
  .delete(user.deleteComment);

// Create & Read Tags
router.route('/posts/:post_id/tags')
  .post(tag.createTag)
  .get(tag.onPost);

// Get Posts By Tag
router.route('/tag/:tag_id/posts')
  .get(tag.getPostsByTag);

// Update & Delete Tags
router.route('/tags/:id')
  .put(tag.update)
  .delete(tag.delete);

// List All Posts By A User
router.route('/user/:user_id/posts')
  .get(user.getPostByUser);

router.route('/user')
  .post(user.create);

router.route('/user/:id')
  .get(user.get)
  .put(user.update)
  .delete(user.delete);

module.exports = router;
