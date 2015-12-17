'use strict';

import Post from './../models/Post';
import Tag from './../models/Tag';

// Create a new post
module.exports.create = (req, res) => {
  let now = new Date();
  let path = req.body.post.title.toLowerCase().split(' ').join('-');
  let author = req.user.username;

  Post.create({
    url_path: path + '-' + author,
    title: req.body.post.title,
    body: req.body.post.body,
    user_id: req.user._id,
    tags: [],
    date_created: now,
    date_modified: now,
  })
  .then(post => {
    res.json({
      post: post,
    });
  });
};

// View a list of all posts
module.exports.index = (req, res) => {
  if(req.query.url_path) {
    Post.findOne({
      'url_path': req.query.url_path,
    })
    .then(post => {
      res.json({
        post: post,
      });
    });
  } else {
    Post.find()
    .then(posts => {
      res.json({
        posts: posts,
      });
    });
  }
};

// Read a post
module.exports.show = (req, res) => {
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

// Update a post
module.exports.update = (req, res) => {
  let author = req.user.username;
  let path = req.body.post.title ?
  req.body.post.title.toLowerCase().split(' ').join('-') + '-' + author : '';

  Post.findById(req.params.id)
  .then(post => {
    if (String(post.user_id) === req.user._id) {
      post.url_path = path || post.url_path;
      post.title = req.body.post.title || post.title;
      post.body = req.body.post.body || post.body;
      post.user_id = post.user_id;
      post.tags = post.tags || [];
      post.date_created = post.date_created;
      post.date_modified = new Date();

      post.save();
      // TODO - Fix this. It is currently optimistic and assumes saving is successful
      return { post: post};
    } else {
      res.json({
        msg: 'You can\'t sit with us.',
      });
    }
  })
  .then(post => {
    res.json({
      post: post,
    });
  });
};

// Delete a post
module.exports.delete = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    if(String(post.user_id) === req.user._id) {
      let post_id = post._id;

      post.remove();
      // TODO - Fix this. It is currently optimistic and assumes saving is successful
      return post_id;
    } else {
      res.json({
        msg: 'No... No... You no do that.',
      });
    }
  })
  .then(deleted_id => {
    res.json({
      deleted_id: deleted_id,
    });
  });
};

module.exports.getPostsByTag = (req, res) => {
  Tag.findById(req.params.tag_id)
  .then(tag => {
    res.json({
      posts: tag.posts,
    });
  });
};

module.exports.postsByUser = (req, res) => {
  Post.find({
    user_id: req.params.user_id,
  })
  .then(list => {
    res.json({
      posts: list,
    });
  });
};
