'use strict';

import Post from './../models/Post';
import { generalErrorResponse, permissionsErrorResponse, unauthorizedErrorResponse } from '../utils/error-factory';

// Create a new post
module.exports.create = (req, res) => {
  if (!req.currentUser) {
    return unauthorizedErrorResponse(res);
  }

  let path = req.body.post.title.replace(/\s/g, '-') + Date.now();

  return Post.create({
    url_path: path,
    title: req.body.post.title,
    body: req.body.post.body,
    _author: req.currentUser._id,
    tags: [],
  })
  .then(post => {
    return res.json({
      post: post,
    });
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

// View a list of all posts
module.exports.index = (req, res) => {
  if(req.query.url_path) {
    return Post.findOne({
      'url_path': req.query.url_path,
    }).populate('tags')
    .then(post => {
      if(post) {
        return res.json({
          post: post,
        });
      } else {
        return res.sendStatus(404);
      }
    });
  } else {
    return Post.find()
    .populate('tags')
    .then(posts => {
      return res.json({
        posts: posts,
      });
    })
    .catch((err) => {
      return generalErrorResponse(res);
    });
  }
};

// Read a post
module.exports.show = (req, res) => {
  return Post.findById(req.params.id)
  .populate('tags')
  .then(post => {
    if(post) {
      return res.json({
        post: post,
      });
    } else {
      res.sendStatus(404);
    }
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

// Update a post
module.exports.update = (req, res) => {
  if (!req.currentUser) {
    return unauthorizedErrorResponse(res);
  }

  return Post.findById(req.params.id)
  .populate('tags')
  .then(post => {
    if (post._author.toString() === req.currentUser._id.toString()) {
      let path = req.body.post.url_path.replace(/\s/g, '-');

      post.url_path = path || post.url_path;
      post.title = req.body.post.title || post.title;
      post.body = req.body.post.body || post.body;
      post._author = post.user_id;

      return post.save()
      .then(post => {
        return res.json({
          post: post,
        });
      });
    } else {
      return permissionsErrorResponse(res);
    }
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

// Delete a post
module.exports.delete = (req, res) => {
  if (!req.currentUser) {
    return unauthorizedErrorResponse(res);
  }

  return Post.findById(req.params.id)
  .then(post => {
    if(String(post._author) === String(req.currentUser._id)) {
      return post.remove();
    } else {
      return permissionsErrorResponse(res);
    }
  })
  .then(() => {
    return res.json({
      deleted_id: req.params.id,
    });
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

module.exports.getPostsByTag = (req, res) => {
  return Post.find({'tags': req.params.tag_id})
  .populate('tags')
  .then(posts => {
    return res.json({
      posts: posts,
    });
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

module.exports.postsByUser = (req, res) => {
  return Post.find({
    _author: req.params.user_id,
  })
  .then(list => {
    return res.json({
      posts: list,
    });
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};
