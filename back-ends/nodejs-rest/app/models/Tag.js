'use strict';

import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

let TagSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

TagSchema.index({text: 1}, { unique: true });

// Setting up virtuals to match the API spec
TagSchema.virtual('id').get(function() {
  return this._id;
});

module.exports = mongoose.model('Tag', TagSchema);
