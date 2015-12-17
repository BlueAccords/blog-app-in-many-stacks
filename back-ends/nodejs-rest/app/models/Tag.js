'use strict';

import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

let TagSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
});

module.exports = mongoose.model('Tag', TagSchema);
