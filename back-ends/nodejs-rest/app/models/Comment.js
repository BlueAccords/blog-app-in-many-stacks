'use strict';

import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

let CommentSchema = new mongoose.Schema({
  _post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    trim: true,
  },
  _author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
},{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// Setting up virtuals to match the API spec
CommentSchema.virtual('post_id').get(function() {
  return this._post;
});

CommentSchema.virtual('id').get(function() {
  return this._id;
});

CommentSchema.virtual('user_id').get(function() {
  return this._author;
});

CommentSchema.virtual('date_created').get(function() {
  return this.createdAt;
});

CommentSchema.virtual('date_modified').get(function() {
  return this.updatedAt;
});

module.exports = mongoose.model('Comment', CommentSchema);
