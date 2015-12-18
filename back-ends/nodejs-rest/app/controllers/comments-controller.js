'use strict';

import Comment from './../models/Comment';
import { generalErrorResponse, permissionsErrorResponse, unauthorizedErrorResponse } from '../utils/error-factory';

module.exports.update = (req, res) => {
  if (!req.currentUser) {
    return unauthorizedErrorResponse(res);
  }

  return Comment.findById(req.params.id)
  .then(comment => {
    if (String(comment._author) === String(req.currentUser._id)) {
      comment._author = comment._author;
      comment._post = comment._post;
      comment.text = req.body.comment.text;

      return comment.save();
    } else {
      permissionsErrorResponse(res);
    }
  })
  .then(updatedComment => {
    return res.json({
      comment: updatedComment,
    });
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

module.exports.delete = (req, res) => {
  if (!req.currentUser) {
    return unauthorizedErrorResponse(res);
  }

  return Comment.findById(req.params.id)
  .then(comment => {
    if (String(comment._author) === String(req.currentUser._id)) {
      return comment.remove();
    } else {
      permissionsErrorResponse(res);
    }
  })
  .then(() => {
    res.json({
      deleted_id: req.params.id,
    });
  })
  .catch((err) => {
    generalErrorResponse(res);
  });
};

module.exports.commentsByPost = (req, res) => {
  return Comment.find({
    _post: req.params.post_id,
  })
  .then(comments => {
    return res.json({
      comments: comments,
    });
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

module.exports.create = (req, res) => {
  if (!req.currentUser) {
    return unauthorizedErrorResponse(res);
  }

  return Comment.create({
    _author: String(req.currentUser._id),
    _post: req.params.post_id,
    text: req.body.comment.text,
  })
  .then(comment => {
    return res.json({
      comment: comment,
    });
  })
  .catch((err) => {
    return generalErrorResponse(res);
  });
};

