import express from 'express';
let router = express.Router();

import Tag from './../models/Tag';

// get a tag based on the name. Show a list of post (title) w/ the tag.
router.get('/:name', (req, res) => {
  Tag.find({ text: req.params.name.toLowerCase() }, (err, tag) => {
    if (tag === null) { req.send('No post with this tag name found'); }
    else { res.json(tag); }
  });
});

module.exports = router;
