'use strict';

import Post from './../models/Post';
import Tag from './../models/Tag';
import { generalErrorResponse, permissionsErrorResponse } from '../utils/error-factory';

// Create a new post
module.exports.create = (req, res) => {
  let now = new Date();
  let path = req.body.post.title.toLowerCase().split(' ').join('-');
  let author = req.user.username;

  Post.create({
    url_path: path + '-' + author,
    title: req.body.post.title,
    body: req.body.post.body,
    _author: req.user._id,
    tags: [],
    date_created: now,
    date_modified: now,
  })
  .then(post => {
    res.json({
      post: post,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

// View a list of all posts
module.exports.index = (req, res) => {
  if(req.query.url_path) {
    Post.findOne({
      'url_path': req.query.url_path,
    })
    .populate('tags')
    .then(post => {
      res.json({
        post: post,
      });
    });
  } else {
    Post.find()
    .populate('tags')
    .then(posts => {
      res.json({
        posts: posts,
      });
    })
    .catch((err) => {
      generalErrorResponse(res);
    });
  }
};

// Read a post
module.exports.show = (req, res) => {
  Post.findById(req.params.id)
  .populate('tags')
  .then(post => {
    res.json({
      post: post,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

// Update a post
module.exports.update = (req, res) => {
  let author = req.user.username;
  let path = req.body.post.title ?
  req.body.post.title.toLowerCase().split(' ').join('-') + '-' + author : '';

  Post.findById(req.params.id)
  .populate('tags')
  .then(post => {
    if (String(post._author) === req.user._id) {
      post.url_path = path || post.url_path;
      post.title = req.body.post.title || post.title;
      post.body = req.body.post.body || post.body;
      post._author = post.user_id;
      post.date_created = post.date_created;
      post.date_modified = new Date();

      post.save();
      // TODO - Fix this. It is currently optimistic and assumes saving is successful
      return { post: post};
    } else {
      permissionsErrorResponse(res);
    }
  })
  .then(post => {
    res.json({
      post: post,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

// Delete a post
module.exports.delete = (req, res) => {
  Post.findById(req.params.id)
  .then(post => {
    if(String(post._author) === req.user._id) {
      let post_id = post._id;

      post.remove();
      // TODO - Fix this. It is currently optimistic and assumes saving is successful
      return post_id;
    } else {
      permissionsErrorResponse(res);
    }
  })
  .then(deleted_id => {
    res.json({
      deleted_id: deleted_id,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

module.exports.getPostsByTag = (req, res) => {
  Tag.findById(req.params.tag_id)
  .then(tag => {
    res.json({
      posts: tag.posts,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

module.exports.postsByUser = (req, res) => {
  Post.find({
    _author: req.params.user_id,
  })
  .then(list => {
    res.json({
      posts: list,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};
