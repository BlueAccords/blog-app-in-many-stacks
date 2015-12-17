'use strict';

import Comment from './../models/Comment';
import { generalErrorResponse, permissionsErrorResponse } from '../utils/error-factory';

module.exports.update = (req, res) => {
  Comment.findById(req.params.id)
  .then(comment => {
    if (String(comment._author) === req.user._id) {
      comment._author = comment._author;
      comment._post = comment._post;
      comment.text = req.body.comment.text;

      // TODO - Fix this. It is currently optimistic and assumes saving is successful
      comment.save();
      return comment;
    } else {
      permissionsErrorResponse(res);
    }
  })
  .then(updatedComment => {
    res.json({
      comment: updatedComment,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

module.exports.delete = (req, res) => {
  Comment.findById(req.params.id)
  .then(comment => {
    if (String(comment._author) === req.user._id) {
      let commentID = comment._author;

      comment.remove();
      // TODO - Fix this. It is currently optimistic and assumes saving is successful
      return commentID;
    } else {
      permissionsErrorResponse(res);
    }
  })
  .then(deletedID => {
    res.json({
      deleted_id: deletedID,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

module.exports.commentsByPost = (req, res) => {
  Comment.find({
    _post: req.params.post_id,
  })
  .then(comments => {
    res.json({
      comments: comments,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

module.exports.create = (req, res) => {
  Comment.create({
    _author: req.user._id,
    _post: req.params.post_id,
    text: req.body.post.text,
  })
  .then(comment => {
    res.json({
      comment: comment,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

