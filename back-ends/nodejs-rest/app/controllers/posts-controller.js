'use strict';

import Post from './../models/Post';

module.exports.create = (req, res) => {
  let now = new Date();
  let path = req.body.title.toLowerCase().split(' ').join('-');
  let author = req.user.username;

  Post.create({
    url_path: path + '-' + author,
    title: req.body.title,
    body: req.body.body,
    user_id: req.user._id,
    date_created: now,
    date_modified: now,
  })
  .then(post => {
    res.json({
      post_created: post,
    });
  });
};

module.exports.all = (req, res) => {
  Post.find()
  .then(posts => {
    res.json({
      posts: posts,
    });
  });
};

module.exports.read = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    res.json({
      post: post,
    });
  },
  err => {
    res.json({
      error: err,
    });
  });
};

module.exports.update = (req, res) => {
  let author = req.user.username;
  let path = req.body.title ?
  req.body.title.toLowerCase().split(' ').join('-') + '-' + author : '';
  // TODO Make less clever.

  Post.findById(req.params.id)
  .then(post => {

    if (String(post.user_id) === req.user._id) {
      post.url_path = path || post.url_path;
      post.title = req.body.title || post.title;
      post.body = req.body.body || post.body;
      post.user_id = post.user_id;
      post.date_created = post.date_created;
      post.date_modified = new Date();

      post.save();
      return post;
    } else {
      res.json({
        msg: 'You can\'t sit with us.',
      });
    }
  })
  .then(post => {
    res.json({
      updated_post: post,
    });
  });
};
