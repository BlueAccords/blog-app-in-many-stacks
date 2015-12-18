'use strict';

import Tag from './../models/Tag';
import Post from './../models/Post';
import * as _ from 'lodash';
import { generalErrorResponse, permissionsErrorResponse } from '../utils/error-factory';
import { Promise } from 'es6-promise';

module.exports.index = (req, res) => {
  if (req.query.text) {
    // Responding to search queries
    return Tag.findOne({
      text: req.query.text,
    })
    .then(tag => {
      return res.json({
        tag: tag,
      });
    })
    .catch((err) => {
      return generalErrorResponse(res);
    });
  } else {
    // Responding to no search query
    return Tag.find()
    .then(tags => {
      return res.json({
        tags: tags,
      });
    })
    .catch((err) => {
      return generalErrorResponse(res);
    });
  }
};

module.exports.create = (req, res) => {
  return Tag.findOne({
    text: req.body.tag.text,
  })
  .then(tag => {
    if (tag === null) {
      let newtag = new Tag({
        text: req.body.tag.text,
      });
      return newtag.save();
    } else {
      return Promise.resolve(tag);
    }
  })
  .then(tag => {
    return res.json({tag: tag});
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

module.exports.toggleTagOnPost = (req, res) => {
  return Tag.findOne({
    _id: req.body.tag_id,
  })
  .then(tag => {
    return Post.findById(req.body.post_id)
    .then(post => {
      if(req.user._id === String(post._author)) {
        if(req.body.status) {
          post.tags = _.unique([...post.tags, tag._id], (x) => String(x));
        } else {
          post.tags = _.filter(post.tags, (x) => String(x) !== req.body.tag_id);
        }
        return post.save();

      } else {
        return permissionsErrorResponse(res);
      }
    })
    .then((post) => {
      return res.json({
        post: post,
      });
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

module.exports.getTagsByPost = (req, res) => {
  return Post.findById(req.params.post_id)
  .then(post => {
    return res.json({
      tags: post.tags,
    });
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

// Only admins can update tags.
// TODO: Implement this later once we actually have a notion of site admins
module.exports.update = (req, res) => {
  return permissionsErrorResponse(res);
};

// Only admins can delete tags.
// TODO: Implement this later once we actually have a notion of site admins
module.exports.delete = (req, res) => {
  return permissionsErrorResponse(res);
};
