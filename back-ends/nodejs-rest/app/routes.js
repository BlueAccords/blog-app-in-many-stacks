'use strict';

import express from 'express';
let router = express.Router();
import user from './controllers/users-controller';
import tag from './controllers/tags-controller';
import jwtMiddleware from './middlewares/jwt';

/**
* Public Routes
*/
router.post('/', user.authenticate);
router.post('/sign-up', user.createNewUser);
router.get('/tag/:name', tag.findAllPostWithTag);

/**
* Routes that need jwt tokens
*/
router.use(jwtMiddleware);
router.get('/user', user.currentUser);
router.get('/user/:username', user.readUser);
router.put('/user/:username', user.updateUser);
router.delete('/user/:username', user.deleteUser);

router.get('/user/:username/posts', user.listUserPosts);
router.post('/user/:username/posts', user.createNewPost);

router.get('/user/:username/posts/:postname', user.readUserPost);
router.post('/user/:username/posts/:postname', user.commentOnPost);
router.get('/user/:username/posts/:postname/comments', user.listAllComments);
router.put('/user/:username/posts/:postname', user.updatePost);
router.delete('/user/:username/posts/:postname', user.deletePost);
// router.use('/tags', require('./tags')); // public: view post that has a tag

module.exports = router;
