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
  Post.findOne({
    _id: req.params.id,
  })
  .then(post => {
    if (post === null) {
      res.json({
        msg: 'No post found',
      });
    }
    res.json({
      post: post,
    });
  });
};
