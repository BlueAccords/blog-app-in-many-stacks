'use strict';

import Tag from './../models/Tag';

// Find all posts that contain a specific tag.
module.exports.findAllPostWithTag = (req, res) => {
  Tag.find({
    text: req.params.name.toLowerCase(),
  }, (err, tag) => {
    if (tag === null) {
      req.send('No post with this tag name found');
    }
    else {
      res.json(tag);
    }
  });
};
