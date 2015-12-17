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
});

TagSchema.index({text: 1}, { unique: true });

module.exports = mongoose.model('Tag', TagSchema);
