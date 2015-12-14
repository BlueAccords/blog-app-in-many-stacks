'use strict';

import express from 'express';
let router = express.Router();

import jwtMiddleware from './middlewares/jwt';
import tag from './controllers/tags-controller';
import user from './controllers/users-controller';
import post from './controllers/posts-controller';

/**
* PUBLIC ROUTES
**/

// Authenticate a user.
router.route('/sign-in')
  .post(user.authenticate);

// Create a new user
router.route('/users')
  .post(user.create);

/**
* PRIVATE ROUTES
**/

// Jwt auth middleware
router.use(jwtMiddleware);

// Read/Update/Delete a user
router.route('/users/:id')
  .get(user.get)
  .put(user.update)
  .delete(user.delete);

// List all posts by user
router.route('/users/:user_id/posts')
  .get(user.postsWritten);

// Create and list posts
router.route('/posts')
  .post(post.create)
  .get(post.all);

// Read/Update/Delete post
router.route('/posts/:id')
  .get(post.read)
  .put(post.update)
  .delete(post.delete);

// TODO comments and tags/ search refactor

// Create and list comments.
router.route('/posts/:post_id/comments')
  .post(post.newComment);
//   .get(post.allComments);

// Update/Delete comment.
// router.route('/comments/:id')
//   .put(post.updateComment)
//   .delete(post.deleteComment);

// Create/Read tags
// router.route('/posts/:post_id/tags')
//   .post(tag.createTag)
//   .get(tag.onPost);

// Get posts by tag
// router.route('/tag/:tag_id/posts')
//   .get(tag.getPosts);

// Update/Delete tags
// router.route('/tags/:id')
//   .put(tag.update)
//   .delete(tag.delete);

// List all tags
// router.route('/tags')
//   .get(tag.all);

// Post search via url_path
// router.route('/posts?path_url=:path_url')
//   .get(post.search)

// Tag search via text
// router.route('/tags/?text=:text')
//   .get(tag.search)

// User search via username
// router.route('/users/?username=:username')
//   .get(user.search)

module.exports = router;
