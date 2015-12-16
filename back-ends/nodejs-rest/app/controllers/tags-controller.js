'use strict';

import Tag from './../models/Tag';
import Post from './../models/Post';
import * as _ from 'lodash';

module.exports.all = (req, res) => {
  if (req.query.text) {
    Tag.findOne({
      text: req.query.text,
    })
    .then(tag => {
      res.json({
        tag: tag,
      });
    });
  } else {
    Tag.find()
    .then(tags => {
      res.json({
        tags: tags,
      });
    });
  }
};

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
      tag.posts = _.unique([...tag.posts, {
        _id: post._id,
        url_path: post.url_path,
        title: post.title,
        body: post.body,
        user_id: post.user_id,
        date_modified: post.date_modified,
        date_created: post.date_created,
      }], (x) => x.url_path);
      tag.save();

      post.tags = _.unique([...post.tags, tag], (x) => x.text);
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

module.exports.getPosts = (req, res) => {
  Tag.findById(req.params.tag_id)
  .then(tag => {
    console.log(tag);
    res.json({
      posts: tag.posts,
    });
  });
};

// since tags don't have author id's, should anyone be able to update them?
module.exports.update = (req, res) => {
  Tag.findById(req.params.tag_id)
  .then(tag => {
    tag.text = req.body.text;
    tag.save();

    return tag;
  })
  .then(tag => {
    res.json({
      updated_tag: tag,
    });
  });
};

// since tags don't have author id's, should anyone be able to delete them?
module.exports.delete = (req, res) => {
  Tag.findById(req.params.tag_id)
  .then(tag => {
    let tagID  = tag._id;

    tag.remove();
    return tagID;
  })
  .then(tagID => {
    res.json({
      deleted_id: tagID,
    });
  });
};
