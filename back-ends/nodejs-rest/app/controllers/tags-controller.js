'use strict';

import Tag from './../models/Tag';
import Post from './../models/Post';
import * as _ from 'lodash';
import { generalErrorResponse, permissionsErrorResponse } from '../utils/error-factory';

module.exports.index = (req, res) => {
  if (req.query.text) {
    // Responding to search queries
    Tag.findOne({
      text: req.query.text,
    })
    .then(tag => {
      res.json({
        tag: tag,
      });
    })
    .catch((err) => {
      generalErrorResponse(res);
    });
  } else {
    // Responding to no search query
    Tag.find()
    .then(tags => {
      res.json({
        tags: tags,
      });
    })
    .catch((err) => {
      generalErrorResponse(res);
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

      // TODO - Fix this. It is currently optimistic and assumes saving is successful
      return newtag;
    } else {
      return tag;
    }
  })
  .catch((err) => {
    generalErrorResponse(res);
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
          post.tags = _.filter(post.tags, (x) => x.id === req.body.tag_id);
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
  Post.findById(req.params.post_id)
  .then(post => {
    res.json({
      tags: post.tags,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
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

    // TODO - Fix this. It is currently optimistic and assumes saving is successful
    return tag;
  })
  .then(tag => {
    res.json({
      tag: tag,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

// since tags don't have author id's, should anyone be able to delete them?
module.exports.delete = (req, res) => {
  Tag.findById(req.params.tag_id)
  .then(tag => {
    let tagID  = tag._id;

    tag.remove();
    // TODO - Fix this. It is currently optimistic and assumes saving is successful
    return tagID;
  })
  .then(tagID => {
    res.json({
      deleted_id: tagID,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};
