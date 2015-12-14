'use strict';

import Comment from './../models/Comment';

module.exports.update = (req, res) => {
  Comment.findById(req.params.id)
  .then(comment => {
    if (String(comment.user_id) === req.user._id) {
      comment.user_id = comment.user_id;
      comment.post_id = comment.post_id;
      comment.text = req.body.text;

      comment.save();
      return comment;
    } else {
      res.send('no');
    }
  })
  .then(updatedComment => {
    res.json({
      updated_comment: updatedComment,
    });
  });
};

module.exports.delete = (req, res) => {
  Comment.findById(req.params.id)
  .then(comment => {
    if (String(comment.user_id) === req.user._id) {
      let commentID = comment._id;

      comment.remove();
      return commentID;
    } else {
      res.json('no');
    }
  })
  .then(deletedID => {
    res.json({
      deleted_id: deletedID,
    });
  });
};
