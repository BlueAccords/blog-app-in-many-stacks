'use strict';

import express from 'express';
let router = express.Router();

import jwtMiddleware from './middlewares/jwt';
import tag from './controllers/tags-controller';
import user from './controllers/users-controller';
import post from './controllers/posts-controller';
import comment from './controllers/comments-controller';

/**
* PUBLIC ROUTES
**/

// Authenticate a user.
router.route('/sign-in')
  .post(user.authenticate);

// Create a new user
router.route('/users')
  .post(user.create);

// Read a user
router.route('/users/:id')
  .get(user.get);

/**
* PRIVATE ROUTES
**/

// Jwt auth middleware
router.use(jwtMiddleware);
router.route('/users')
  .get(user.index);

// Update/Delete a user
router.route('/users/:id')
  .put(user.update)
  .delete(user.delete);

// List all posts by user
router.route('/users/:user_id/posts')
  .get(post.postsByUser);

// Create and list posts
router.route('/posts')
  .post(post.create)
  .get(post.index);

// Read/Update/Delete post
router.route('/posts/:id')
  .get(post.show)
  .put(post.update)
  .delete(post.delete);

// Create and list comments.
router.route('/posts/:post_id/comments')
  .post(comment.create)
  .get(comment.commentsByPost);

// Update/Delete comment.
router.route('/comments/:id')
  .put(comment.update)
  .delete(comment.delete);

// Create/Read tags
router.route('/posts/:post_id/tags')
  .post(tag.create)
  .get(tag.getTagsByPost);

// Get posts by tag
router.route('/tags/:tag_id/posts')
  .get(post.getPostsByTag);

// Update/Delete tags
router.route('/tags/:id')
  .put(tag.update)
  .delete(tag.delete);

// List all tags
router.route('/tags')
  .get(tag.index);

// Toggle tag on a post
router.route('/toggle-tag-on-post')
  .post(tag.toggleTagOnPost);

module.exports = router;
