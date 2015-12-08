/* eslint require-jsdoc: 0*/
/* eslint valid-jsdoc: 0*/
'use strict';

import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';
import helper from './helper';

import User from './../models/User';
import Post from './../models/Post';
import Comment from './../models/Comment';
import Tag from './../models/Tag';

/**
 * @api {post} / Authenticate A User
 * @apiName Authenticate A User
 * @apiGroup Login
 *
 * @apiParam {string} username Users unique username.
 * @apiParam {string} password Users unique password.
*/
module.exports.authenticate = (req, res) => {
  User.findOne({
    username: req.body.username.toLowerCase(),
  }, (err, user) => {
    if (user === null) {
      helper.noUserFound(res);
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user, config.app.secret, {
          expiresIn: 1440 * 60,
        });

        res.json({
          message: 'A token has been passed. You are now logged in!',
          token,
        });
      } else {
        helper.permissionDenied(res);
      }
    }
  });
};

/**
 * @api {post} /sign-up Create a new User/ Account
 * @apiName Create A New User/ Account
 * @apiGroup Sign-Up
 *
 * @apiParam {string} fName User's First name.
 * @apiParam {string} lName User's Last name.
 * @apiParam {string} email User's email.
 * @apiParam {string} username User's username.
 * @apiParam {string} password User's password.
*/
module.exports.createNewUser = (req, res) => {
  User.findOne({
    username: req.body.username.toLowerCase(),
  }, (err, user) => {
    if (!user) {
      bcrypt.hash(req.body.password, 8, (err, hash) => {
        User.create({
          fName: req.body.fName,
          lName: req.body.lName,
          email: req.body.email.toLowerCase(),
          username: req.body.username.toLowerCase(),
          password: hash,
        });
      });

      helper.success(res);
    } else {
      helper.userExists(res);
    }
  });
};

/**
 * @api {get} /user/ View current user info.
 * @apiName currentUser
 * @apiGroup User
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
*/
module.exports.currentUser = (req, res) => {
  User.findOne({
    username: req.decoded.username,
  }, (err, user) => {
    if (user === null) {
      helper.noUserFound(res);
    }
    else {
      res.json(user);
    }
  });
};

/**
 * @api {get} /user/:username Read a specific user's info.
 * @apiName showUser
 * @apiGroup User
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
*/
module.exports.showUser = (req, res) => {
  User.findOne({
    username: req.params.username.toLowerCase(),
  }, (err, user) => {
    if (user === null) {
      helper.noUserFound(res);
    }
    else {
      res.json(user);
    }
  });
};

/**
 * @api {put} /user/:username Update the current user's info.
 * @apiName updateUser
 * @apiGroup User
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {string} fName User's First name.
 * @apiParam {string} lName User's Last name.
 * @apiParam {string} email User's email.
 * @apiParam {string} username User's username.
 * @apiParam {string} password User's password.
*/
module.exports.updateUser = (req, res) => {
  if (req.decoded.username === req.params.username.toLowerCase()) {
    User.findOne({
      username: req.params.username.toLowerCase(),
    }, (err, user) => {
      if (user === null) {
        helper.noUserFound(res);
      } else {
        user.fName = req.body.fName;
        user.lName = req.body.lName;
        user.email = req.body.email;
        user.username = req.body.username.toLowerCase();
        user.password = bcrypt.hashSync(req.body.password, 8);

        user.save((err) => {
          if (err) {
            return err;
          } else {
            helper.success(res);
          }
        });
      }
    });
  } else {
    helper.permissionDenied(res);
  }
};

/**
 * @api {delete} /user/:username Delete the current user's account.
 * @apiName deleteUser
 * @apiGroup User
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
*/
module.exports.deleteUser = (req, res) => {
  if (req.decoded.username === req.params.username.toLowerCase()) {
    User.findOne({
      username: req.params.username.toLowerCase(),
    }, (err, user) => {
      if (user === null) {
        helper.noUserFound(res);
      } else {
        user.remove();
        helper.success(res);
      }
    });
  } else {
    helper.permissionDenied(res);
  }
};

/**
 * @api {get} /user/:username/posts List all the posts written by a specific user.
 * @apiName listUserPosts
 * @apiGroup User-Posts
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
*/
module.exports.listUserPosts = (req, res) => {
  Post.find({
    user: req.params.username.toLowerCase(),
  }, (err, posts) => {
    res.json(posts);
  });
};

/**
 * @api {post} /user/:username/posts Create a new post as the current user.
 * @apiName createNewPost
 * @apiGroup User-Posts
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {string} title Title of the post.
 * @apiParam {string} title Body of the post.
*/
module.exports.createNewPost = (req, res) => {
  if (req.decoded.username === req.params.username.toLowerCase()) {
    let tagArr = req.body.tags.split(', ');

    let newPost = new Post({
      title: req.body.title.toLowerCase(),
      body: req.body.body,
      user: req.params.username.toLowerCase(),
      tags: tagArr,
    });
    newPost.save();

    // Create a new tag for each tag listed on a post.
    tagArr.forEach( (tag) => {
      Tag.create({
        text: tag.toLowerCase(),
        post: req.body.title.toLowerCase(),
      });
    });

    helper.success(res);
  } else {
    helper.permissionDenied(res);
  }
};

/**
 * @api {get} /user/:username/posts/:postname Read a specific post written by a user.
 * @apiName readUserPost
 * @apiGroup User-Posts
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {URL-param} url.postname User's post title-url.
*/
module.exports.readUserPost = (req, res) => {
  // Single Post URL (The title. Words seperated by a "-") to string
  let urlTitle = req.params.postname.split('-');
  let fixedTitle = urlTitle.join(' ');

  Post.findOne({
    title: fixedTitle,
    user: req.params.username.toLowerCase(),
  }, (err, post) => {
    res.json(post);
  });
};

/**
 * @api {post} /user/:username/posts/:postname Comment on a post as the current user.
 * @apiName commentOnPost
 * @apiGroup .Post-Comments
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {URL-param} url.postname User's post title-url.
 * @apiParam {string} text Text which makes up the comment.
*/
module.exports.commentOnPost = (req, res) => {
  Comment.create({
    post: req.params.postname,
    user: req.decoded.username,
    text: req.body.text,
  });

  helper.success(res);
};

/**
 * @api {get} /user/:username/posts/:postname/comments List all the comments on a given post.
 * @apiName listAllComments
 * @apiGroup .Post-Comments
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {URL-param} url.postname User's post title-url.
*/
module.exports.listAllComments = (req, res) => {
  Comment.find({
    post: req.params.postname,
  }, (err, list) => {
    res.json(list);
  });
};

/**
 * @api {put} /user/:username/posts/:postname Update a post written by the current user.
 * @apiName updatePost
 * @apiGroup User-Posts
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {URL-param} url.postname User's post title-url.
 * @apiParam {string} title Either the updated title or the current one.
 * @apiParam {string} body Either the updated body or the current one.
*/
module.exports.updatePost = (req, res) => {
  let urlTitle = req.params.postname.split('-');
  let fixedTitle = urlTitle.join(' ');
  // Tags in the post body (comman seperated) go in an array.
  let tagArr = req.body.tags.split(', ');

  if (req.decoded.username === req.params.username.toLowerCase()) {
    // Lowercase for consistent search.
    Post.findOne({
      title: fixedTitle,
      user: req.params.username.toLowerCase(),
    }, (err, post) => {
      post.title = req.body.title.toLowerCase();
      post.body = req.body.body;
      post.user = req.params.username.toLowerCase();
      post.tags = tagArr;

      post.save();
      helper.success(res);
    });
  } else {
    helper.permissionDenied(res);
  }
};

/**
 * @api {delete} /user/:username/posts/:postname Delete a post written by the current user.
 * @apiName deletePost
 * @apiGroup User-Posts
 *
 * @apiHeader (jwt-token) {String} x-access-token Token Authentication.
 *
 * @apiParam {URL-param} url.username User's username.
 * @apiParam {URL-param} url.postname User's post title-url.
*/
module.exports.deletePost = (req, res) => {
  let urlTitle = req.params.postname.split('-');
  let fixedTitle = urlTitle.join(' ');

  if (req.decoded.username === req.params.username.toLowerCase()) {
    Post.findOne({
      title: fixedTitle,
    }, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        post.remove();
        helper.success(res);
      }
    });
  } else {
    helper.permissionDenied(res);
  }
};
