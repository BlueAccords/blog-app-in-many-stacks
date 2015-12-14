'use strict';

import Tag from './../models/Tag';
import Post from './../models/Post';

module.exports.create = (req, res) => {
  Tag.findOne({
    text: req.body.text,
  })
  .then(tag => {
    if (tag === null) {
      let newtag = new Tag({
        text: req.body.text,
      });
      newtag.save();

      return newtag;
    } else {
      return tag;
    }
  })
  .then(tag => {
    Post.findById(req.params.post_id)
    .then(post => {
      post.tags.push(tag);
      post.save();

      res.json({
        post: post,
      });
    });
  });
};

module.exports.list = (req, res) => {
  Post.findById(req.params.post_id)
  .then(post => {
    res.json({
      post_tags: post.tags,
    });
  });
};
