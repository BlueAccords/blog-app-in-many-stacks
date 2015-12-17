'use strict';

import Tag from './../models/Tag';
import Post from './../models/Post';
import * as _ from 'lodash';

module.exports.index = (req, res) => {
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
    text: req.body.tag.text,
  })
  .then(tag => {
    if (tag === null) {
      let newtag = new Tag({
        text: req.body.tag.text,
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

module.exports.getTagsByPost = (req, res) => {
  Post.findById(req.params.post_id)
  .then(post => {
    res.json({
      tags: post.tags,
    });
  });
};

// since tags don't have author id's, should anyone be able to update them?
// TODO - Think through this. Thinking only admins of a site will be able
// To update tags. For everyone else, tags shouldn't be updatable. Just removable.
module.exports.update = (req, res) => {
  Tag.findById(req.params.tag_id)
  .then(tag => {
    tag.text = req.body.tag.text;
    tag.save();

    return tag;
  })
  .then(tag => {
    res.json({
      tag: tag,
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
