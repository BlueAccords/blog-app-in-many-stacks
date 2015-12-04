'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import config from './../config';
import jwt from 'jsonwebtoken';
import helper from './helper';
let router = express.Router();

import User from './../models/User';
import Post from './../models/Post';
import Comment from './../models/Comment';

/**
* Middleware to check for user tokens
*/
router.use((req, res, next) => {
  // token is assigned to any token passed through the body, head, or query
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // if the token exists
  if (token) {
    // check to see if the token is valid
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) { helper.tokenFail(res) }
      else {
        // a new key is added to the request object
        // the new key has a value of the unencoded token payload (user info)
        req.decoded = decoded;
        next();
      }
    });
  } else { helper.tokenFail(res); }
});

/**
* LIST (GET request) all the Users in the DB.
*/
router.get('/', (req, res) => {
  User.findOne({ username: req.decoded.username }, (err, user) => {
    if (user === null) { helper.noUserFound(res); }
    else { res.json(user); }
  });
});

/**
* READ (GET request) an individual User's infromation.
*/
router.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username },
    (err, user) => {
      if (user === null) { helper.noUserFound(res); }
      else { res.json(user); }
  });
});

/**
* UPDATE an individual User via PUT request. (If the user is making the req)
*/
router.put('/:username', (req, res) => {
  if (req.decoded.username === req.params.username) {
    User.findOne({ username: req.params.username, },
      (err, user) => {
        if (user === null) { helper.noUserFound(res); }
        else {
          user.fName = req.body.fName;
          user.lName = req.body.lName;
          user.email = req.body.email;
          user.username = req.body.username;
          user.password = bcrypt.hashSync(req.body.password, 8);

          user.save((err) => {
            if (err) { return err; }
            else { helper.success(res); }
          });
        }
    });
  } // do not allow users to update other users.
  else { helper.permissionDenied(res); }
});

/**
* DELETE (via DELETE request) an individual User.
*/
router.delete('/:username', (req, res) => {
  // view router.put. Same concept, but for deleting users.
  if (req.decoded.username === req.params.username) {
    User.findOne({ username: req.params.username },
      (err, user) => {
        if (user === null) { helper.noUserFound(res); }
        else {
          user.remove();
          helper.success(res);
        }
      });
  } else { helper.permissionDenied(res); }
});

// get a list of posts for a specific user
router.get('/:username/posts', (req, res) => {
  Post.find({ user: req.params.username }, (err, posts) => {
    res.json(posts);
  });
});

// create a new post (if you are the user)
router.post('/:username/posts', (req, res) => {
  if (req.decoded.username === req.params.username) {
    let tagArr = req.body.tags.split(', ');

    let newPost = new Post({
      title: req.body.title.toLowerCase(),
      body: req.body.body,
      user: req.params.username,
      tags: tagArr,
    });

    newPost.save();

    helper.success(res);
  } else { helper.permissionDenied(res); }
});

// go to a specific post, by a specific user.
router.get('/:username/posts/:postname', (req, res) => {
    var urlTitle = req.params.postname.split('-');
    var fixedTitle = urlTitle.join(' ');

    Post.findOne({ title: fixedTitle,
      user: req.params.username,
    }, (err, post) => {
      res.json(post);
    });
});

// update a post (if you're the author)
router.put('/:username/posts/:postname', (req, res) => {
    var urlTitle = req.params.postname.split('-');
    var fixedTitle = urlTitle.join(' ');

    if (req.decoded.user === req.params.username) {
      Post.findOne({ title: fixedTitle,
        user: req.params.username,
      }, (err, post) => {
        let tagArr = req.body.tags.split(', ');

        post.title = req.body.title.toLowerCase();
        post.body = req.body.body;
        post.user = req.params.username;
        post.tags = tagArr;

      });
    } else { helper.permissionDenied(res); }
});

// delete a post (if you're the author)
router.delete('/:username/posts/:postname', (req, res) => {
  if (req.decoded.user === req.params.username) {
    Post.findOne({ title: req.params.postname }, (err, post) => {
      if (err) { res.send(err) }
      else {
        post.remove();
        helper.permissionDenied(res);
      }
    });
  } else { helper.permissionDenied(res); }
});

// add a comment to a post
router.post('/:username/posts/:postname', (req, res) => {
  Comment.create({
    post: req.params.postname,
    user: req.decoded.username,
    text: req.body.text,
  });

  helper.success(res);
});

// get the list of comments for a specific post
router.get('/:username/posts/:postname/comments', (req, res) => {
  Comment.find({ post: req.params.postname }, (err, list) => {
    res.json(list);
  });
});

module.exports = router;
