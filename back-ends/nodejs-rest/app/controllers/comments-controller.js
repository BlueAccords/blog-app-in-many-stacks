'use strict';

import Comment from './../models/Comment';

module.exports.update = (req, res) => {
  Comment.findById(req.params.id)
  .then(comment => {
    if (String(comment.user_id) === req.user._id) {
      comment.user_id = comment.user_id;
      comment.post_id = comment.post_id;
      comment.text = req.body.comment.text;

      // TODO - Fix this. It is currently optimistic and assumes saving is successful
      comment.save();
      return comment;
    } else {
      res.send('no');
    }
  })
  .then(updatedComment => {
    res.json({
      comment: updatedComment,
    });
  });
};

module.exports.delete = (req, res) => {
  Comment.findById(req.params.id)
  .then(comment => {
    if (String(comment.user_id) === req.user._id) {
      let commentID = comment._id;

      comment.remove();
      // TODO - Fix this. It is currently optimistic and assumes saving is successful
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

module.exports.commentsByPost = (req, res) => {
  Comment.find({
    post_id: req.params.post_id,
  })
  .then(comments => {
    res.json({
      comments: comments,
    });
  });
};

module.exports.create = (req, res) => {
  Comment.create({
    user_id: req.user._id,
    post_id: req.params.post_id,
    text: req.body.post.text,
  })
  .then(comment => {
    res.json({
      comment: comment,
    });
  });
};

