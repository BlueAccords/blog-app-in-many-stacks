'use strict';

import express from 'express';
let router = express.Router();

import jwtMiddleware from './middlewares/jwt';
import tag from './controllers/tags-controller';
import user from './controllers/users-controller';

/**
* Public Routes (anyone can visit).
**/

// User Auth.
router.route('/')
  .post(user.authenticate);

// Create User/ Acc.
router.route('/sign-up')
  .post(user.createNewUser);

// Search for Tag & Posts
router.route('/tag/:name')
  .get(tag.findAllPostWithTag);


/**
* Private Routes (need jwt token).
**/

// Auth/ JWT middleware.
router.use(jwtMiddleware);

// User Index/Home.
router.get('/user', user.currentUser);

// User Info routes.
router.route('/user/:username')
  .get(user.showUser)
  .put(user.updateUser)
  .delete(user.deleteUser);

// User Post(s) routes.
router.route('/user/:username/posts')
  .get(user.listUserPosts)
  .post(user.createNewPost);

// User Post routes.
router.route('/user/:username/posts/:postname')
  .get(user.readUserPost)
  .post(user.commentOnPost)
  .put(user.updatePost)
  .delete(user.deletePost);

// User Post Comment routes
router.route('/user/:username/posts/:postname/comments')
  .get(user.listAllComments);

module.exports = router;
