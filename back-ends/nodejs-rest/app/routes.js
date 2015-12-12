'use strict';

import express from 'express';
let router = express.Router();

import jwtMiddleware from './middlewares/jwt';
import tag from './controllers/tags-controller';
import user from './controllers/users-controller';
import post from './controllers/posts-controller';

// Authenticate A User.
router.route('/sign-in')
  .post(user.authenticate);

// Create A New User
router.route('/users')
  .post(user.create);

// Auth/ JWT middleware.
router.use(jwtMiddleware);

/**
* User Routes
**/

// Read, Update & Delete User
router.route('/users/:id')
  .get(user.get)
  .put(user.update)
  .delete(user.delete);

// List All Posts By A User
router.route('/users/:user_id/posts')
  .get(user.postsWritten);

/**
* Post Routes
**/

// Create & List Posts
router.route('/posts')
  .post(post.create)
  .get(post.all);

// Read, Update, & Delete Post
router.route('/posts/:id')
  .get(post.read)
  .put(post.update)
  .delete(post.delete);
//
// /***
// * Comment Routes
// **/
//
// // Create & List Comments.
// router.route('/posts/:post_id/comments')
//   .post(post.newComment)
//   .get(post.allComments);
//
// // Update & Delete Comment.
// router.route('/comments/:id')
//   .put(post.updateComment)
//   .delete(post.deleteComment);
//
// /***
// * Tag Routes
// **/
//
// // Create & Read Tags
// router.route('/posts/:post_id/tags')
//   .post(tag.createTag)
//   .get(tag.onPost);
//
// // Get Posts By Tag
// router.route('/tag/:tag_id/posts')
//   .get(tag.getPosts);
//
// // Update & Delete Tags
// router.route('/tags/:id')
//   .put(tag.update)
//   .delete(tag.delete);
//
// // List All Tags
// router.route('/tags')
//   .get(tag.all);
//
// /***
// * Search Routes
// **/
//
// // Post Search via URL Path
// router.route('/posts?path_url=:path_url')
//   .get(post.search)
//
// // Tag Search via Text
// router.route('/tags/?text=:text')
//   .get(tag.search)
//
// // User Search via Username
// router.route('/users/?username=:username')
//   .get(user.search)

module.exports = router;
