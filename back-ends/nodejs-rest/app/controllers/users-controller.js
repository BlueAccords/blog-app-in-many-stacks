'use strict';

import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';
import helper from './helper';

import User from './../models/User';
import Post from './../models/Post';
import Comment from './../models/Comment';
import Tag from './../models/Tag';

module.exports.authenticate = (req, res) => {
  // look for the user (based on username) in the DB
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (user === null) { helper.noUserFound(res); } // user does not exist.
    else {
      // compare the attempted pw to the pw stored for the user
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //Create a new token, passing in the user IF pw is correct
        let token = jwt.sign(user, config.app.secret, {
          expiresIn: 1440 * 60,
        });

        res.json({
          message: 'A token has been passed. You are now logged in!',
          token,
        }); // v- User exists but pw is incorrect. -v
      } else { helper.permissionDenied(res); }
    }
  });
};

module.exports.createNewUser = (req, res) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
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
    } else { helper.userExists(res); }
  });
};

module.exports.currentUser = (req, res) => {
  User.findOne({ username: req.decoded.username }, (err, user) => {
    if (user === null) { helper.noUserFound(res); }
    else { res.json(user); }
  });
};

module.exports.readUser = (req, res) => {
  User.findOne({ username: req.params.username.toLowerCase() },
    (err, user) => {
      if (user === null) { helper.noUserFound(res); }
      else { res.json(user); }
    });
};

module.exports.updateUser = (req, res) => {
  if (req.decoded.username === req.params.username.toLowerCase()) {
    User.findOne({ username: req.params.username.toLowerCase() },
      (err, user) => {
        if (user === null) { helper.noUserFound(res); }
        else {
          user.fName = req.body.fName;
          user.lName = req.body.lName;
          user.email = req.body.email;
          user.username = req.body.username.toLowerCase();
          user.password = bcrypt.hashSync(req.body.password, 8);

          user.save((err) => {
            if (err) { return err; }
            else { helper.success(res); }
          });
        }
      });
  } // do not allow users to update other users.
  else { helper.permissionDenied(res); }
};

module.exports.deleteUser = (req, res) => {
  // view router.put. Same concept, but for deleting users.
  if (req.decoded.username === req.params.username.toLowerCase()) {
    User.findOne({ username: req.params.username.toLowerCase() },
      (err, user) => {
        if (user === null) { helper.noUserFound(res); }
        else {
          user.remove();
          helper.success(res);
        }
      });
  } else { helper.permissionDenied(res); }
};

module.exports.listUserPosts = (req, res) => {
  Post.find({ user: req.params.username.toLowerCase() }, (err, posts) => {
    res.json(posts);
  });
};

module.exports.createNewPost = (req, res) => {
  if (req.decoded.username === req.params.username.toLowerCase()) {
    let tagArr = req.body.tags.split(', ');

    // the post
    let newPost = new Post({
      title: req.body.title.toLowerCase(),
      body: req.body.body,
      user: req.params.username.toLowerCase(),
      tags: tagArr,
    });
    newPost.save();

    // for each tag in the array, make a new Tag w/ the title of the post
    tagArr.forEach( (tag) => {
      Tag.create({
        text: tag.toLowerCase(),
        post: req.body.title.toLowerCase(),
      });
    });

    helper.success(res);
  } else { helper.permissionDenied(res); }
};

module.exports.readUserPost = (req, res) => {
  // spaces in a posts title are seperated by a - in the route
  let urlTitle = req.params.postname.split('-');
  let fixedTitle = urlTitle.join(' ');

  Post.findOne({ title: fixedTitle,
      user: req.params.username.toLowerCase(),
    }, (err, post) => {
    res.json(post);
  });
};

module.exports.commentOnPost = (req, res) => {
  Comment.create({
    post: req.params.postname,
    user: req.decoded.username,
    text: req.body.text,
  });

  helper.success(res);
};

module.exports.listAllComments = (req, res) => {
  Comment.find({ post: req.params.postname }, (err, list) => {
    res.json(list);
  });
};

module.exports.updatePost = (req, res) => {
  // spaces in a posts title are seperated by a - in the route
  let urlTitle = req.params.postname.split('-');
  let fixedTitle = urlTitle.join(' ');
  let tagArr = req.body.tags.split(', ');

  if (req.decoded.username === req.params.username.toLowerCase()) {
    Post.findOne({ title: fixedTitle,
      user: req.params.username.toLowerCase(),
    }, (err, post) => {
      // to lowercase for consistent search
      post.title = req.body.title.toLowerCase();
      post.body = req.body.body;
      post.user = req.params.username.toLowerCase();
      post.tags = tagArr;

      post.save();

      helper.success(res);
    });
  } else { helper.permissionDenied(res); }
};

module.exports.deletePost = (req, res) => {
  let urlTitle = req.params.postname.split('-');
  let fixedTitle = urlTitle.join(' ');

  if (req.decoded.username === req.params.username.toLowerCase()) {
    Post.findOne({ title: fixedTitle }, (err, post) => {
      if (err) { res.send(err); }
      else {
        post.remove();
        helper.success(res);
      }
    });
  } else { helper.permissionDenied(res); }
};
