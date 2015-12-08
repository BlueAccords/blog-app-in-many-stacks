'use strict';

import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';
import helper from './helper';

import User from './../models/User';
import Post from './../models/Post';
import Comment from './../models/Comment';
import Tag from './../models/Tag';

// Authenticate a user by logging in.
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

// Create a new user.
module.exports.createNewUser = (req, res) => {
  User.findOne({
    username: req.body.username.toLowerCase(),
  }, (err, user) => {
    if (!user) {
      bcrypt.hash(req.body.password, 8, (err, hash) => {
        User.create({
          name: req.body.name,
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

// Show the current user's info.
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

// Read a specific user's info.
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

// Update the current user's info.
module.exports.updateUser = (req, res) => {
  if (req.decoded.username === req.params.username.toLowerCase()) {
    User.findOne({
      username: req.params.username.toLowerCase(),
    }, (err, user) => {
      if (user === null) {
        helper.noUserFound(res);
      } else {
        user.name = req.body.name;
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

// Delete the current user's account.
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

// List all the posts written by a specific user.
module.exports.listUserPosts = (req, res) => {
  Post.find({
    user: req.params.username.toLowerCase(),
  }, (err, posts) => {
    res.json(posts);
  });
};

// Create a new post as the current user.
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

// Read a specific post written by a user.
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

// Comment on a post as the current user.
module.exports.commentOnPost = (req, res) => {
  Comment.create({
    post: req.params.postname,
    user: req.decoded.username,
    text: req.body.text,
  });

  helper.success(res);
};

// List all the comments on a given post.
module.exports.listAllComments = (req, res) => {
  Comment.find({
    post: req.params.postname,
  }, (err, list) => {
    res.json(list);
  });
};

// Update a post written by the current user.
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

// Delete a post written by the current user.
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
