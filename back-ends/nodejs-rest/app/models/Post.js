'use strict';

import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

let PostSchema = new mongoose.Schema({
  url_path: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  _author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [{
    text: String,
    tag_id: mongoose.Schema.Types.ObjectId,
  }],
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// Setting up virtuals to match the API spec
PostSchema.virtual('author_id').get(function() {
  return this._author;
});
module.exports = mongoose.model('Post', PostSchema);
