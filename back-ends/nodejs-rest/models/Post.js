'use strict';

import mongoose from 'mongoose';

let PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  user: String,
  tags: Array,
});

module.exports = mongoose.model('Post', PostSchema);
