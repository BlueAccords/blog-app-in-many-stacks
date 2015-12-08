'use strict';

import express from 'express';
let router = express.Router();
import user from './controllers/users-controller';
import tag from './controllers/tags-controller';
import jwtMiddleware from './middlewares/jwt';

/**
* Public Routes (anyone can visit).
*/
router.post('/', user.authenticate);
router.post('/sign-up', user.createNewUser);
router.get('/tag/:name', tag.findAllPostWithTag);

/**
* Private Routes (need jwt token).
*/
router.use(jwtMiddleware);

// User index.
router.get('/user', user.currentUser);

// User info routes.
router.get('/user/:username', user.showUser);
router.put('/user/:username', user.updateUser);
router.delete('/user/:username', user.deleteUser);

// User Post routes.
router.post('/user/:username/posts', user.createNewPost);
router.get('/user/:username/posts', user.listUserPosts);
router.put('/user/:username/posts/:postname', user.updatePost);
router.delete('/user/:username/posts/:postname', user.deletePost);

// User Post/Comment routes.
router.post('/user/:username/posts/:postname', user.commentOnPost);
router.get('/user/:username/posts/:postname', user.readUserPost);
router.get('/user/:username/posts/:postname/comments', user.listAllComments);

module.exports = router;
