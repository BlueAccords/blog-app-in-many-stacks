'use strict';

import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

let PostSchema = new mongoose.Schema({
  url_path: { type: String, required: true, trim: true, unique: true},
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true, trim: true },
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// Setting up virtuals to match the API spec
PostSchema.virtual('user_id').get(function() {
  return this._author;
});

PostSchema.virtual('id').get(function() {
  return this._id;
});

PostSchema.virtual('date_created').get(function() {
  return this.createdAt;
});

PostSchema.virtual('date_modified').get(function() {
  return this.updatedAt;
});

module.exports = mongoose.model('Post', PostSchema);
