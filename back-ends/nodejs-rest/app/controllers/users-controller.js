'use strict';

import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';

import User from './../models/User';
import Post from './../models/Post';
import Comment from './../models/Comment';
import Tag from './../models/Tag';

module.exports.authenticate = (req, res) => {
  User.findOne({ username: req.body.username.toLowerCase() })
  .then( (user) => {
    if (user === null) {
      res.json({
        msg: 'Err. No user found.',
      });
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        let token = jwt.sign(user, config.app.secret, { expiresIn: 1440 * 60 });

        res.json({
          token,
        });
      } else {
        res.json({
          msg: 'Err. Failed to authenticate.',
        });
      }
    }
  });
};

module.exports.createNewUser = (req, res) => {
  User.findOne({ username: req.body.username.toLowerCase() })
  .then( (user) => {
    if (user !== null) {
      res.json({
        msg: 'Err. This user already exists.',
      });
    } else {
      bcrypt.hash(req.body.password, 8, (err, hash) => {
        if (err) {
          res.send(err);
        } else {
          let newUser = new User({
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: hash,
          });
          newUser.save();

          res.json({'user': newUser});
        }
      });
    }
  });
};

module.exports.currentUser = (req, res) => {
  User.findOne({ username: req.user.username })
  .then(user => {
    res.json({'user': user});
  });
};

module.exports.showUser = (req, res) => {
  User.findOne({ username: req.params.username.toLowerCase() })
  .then(user => {
    if (user === null) {
      res.json({
        msg: 'Err. No user found.',
      });
    }
    else {
      res.json(user);
    }
  });
};

module.exports.updateUser = (req, res) => {
  if (req.user.username === req.params.username.toLowerCase()) {
    User.findOne({ username: req.params.username.toLowerCase() })
    .then(user => {
      if (user === null) {
        res.json({
          msg: 'Err. No user found.',
        });
      } else {
        user.name = req.body.name;
        user.email = req.body.email;
        user.username = req.body.username.toLowerCase();
        user.password = bcrypt.hashSync(req.body.password, 8);

        user.save();
        res.json(user);
      }
    });
  } else {
    res.json({
      msg: 'You are not authorized to do that.',
    });
  }
};

module.exports.deleteUser = (req, res) => {
  if (req.user.username === req.params.username.toLowerCase()) {
    User.findOne({ username: req.params.username.toLowerCase() })
    .then(user => {
      user.remove();
      res.json({
        deleted_id: user._id,
      });
    });
  } else {
    res.json({
      msg: 'You are not authorized to do that.',
    });
  }
};

module.exports.listUserPosts = (req, res) => {
  Post.find({ user: req.params.username.toLowerCase() })
  .then(posts => {
    res.json(posts);
  });
};

module.exports.createNewPost = (req, res) => {
  if (req.user.username === req.params.username.toLowerCase()) {
    let tagArr = req.body.tags.split(', ');

    let newPost = new Post({
      title: req.body.title.toLowerCase(),
      body: req.body.body,
      user: req.params.username.toLowerCase(),
      tags: tagArr,
    });
    newPost.save()
    .then( (post) => {
      post.tags.forEach( (tag) => {
        Tag.create({
          text: tag.toLowerCase(),
          post: post.title,
          post_id: post._id,
        });
      });
    });

    res.json(newPost);
  } else {
    res.json({
      msg: 'You are not authorized to do that.',
    });
  }
};

module.exports.readUserPost = (req, res) => {
  // Single Post URL (The title. Words seperated by a "-") to string
  let urlTitle = req.params.postname.split('-');
  let fixedTitle = urlTitle.join(' ');

  Post.findOne({
    title: fixedTitle,
    user: req.params.username.toLowerCase(),
  }).then( post => {
    if (post) {
      res.json(post);
    } else {
      res.json({
        msg: 'This post does not exist',
      });
    }
  });
};

module.exports.commentOnPost = (req, res) => {
  Comment.create({
    post: req.params.postname,
    user: req.user.username,
    text: req.body.text,
  }).then(comment => {
    res.json(comment);
  });
};

module.exports.listAllComments = (req, res) => {
  Comment.find({ post: req.params.postname})
  .then(list => {
    res.json(list);
  });
};

module.exports.updatePost = (req, res) => {
  let urlTitle = req.params.postname.split('-');
  let fixedTitle = urlTitle.join(' ');
  // Tags in the post body (comman seperated) go in an array.
  let tagArr = req.body.tags.split(', ');

  if (req.user.username === req.params.username.toLowerCase()) {
    // Lowercase for consistent search.
    Post.findOne({
      title: fixedTitle,
      user: req.params.username.toLowerCase(),
    }).then(post => {
      post.title = req.body.title.toLowerCase();
      post.body = req.body.body;
      post.user = req.params.username.toLowerCase();
      post.tags = tagArr;

      post.save();
      res.json(post);
    });
  } else {
    res.json({
      msg: 'You are not authorized to do that.',
    });
  }
};

module.exports.deletePost = (req, res) => {
  let urlTitle = req.params.postname.split('-');
  let fixedTitle = urlTitle.join(' ');

  if (req.user.username === req.params.username.toLowerCase()) {
    Post.findOne({ title: fixedTitle })
    .then(post => {
      post.remove();

      Tag.find({post_id: post._id})
      .then(tags => {
        tags.forEach(tag => {
          tag.remove();
        });
      });

      res.json({
        deleted_id: post._id,
      });
    });
  } else {
    res.json({
      msg: 'You are not authorized to do that.',
    });
  }
};
