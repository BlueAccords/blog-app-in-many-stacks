'use strict';

import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  date_modified: {
    type: Date,
    required: true,
    trim: true,
  },
  date_created: {
    type: Date,
    required: true,
    trim: true,
  },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

UserSchema.virtual('id').get(function() {
  return this._id;
});

module.exports = mongoose.model('User', UserSchema);
