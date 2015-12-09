'use strict';

import mongoose from 'mongoose';

let TagSchema = new mongoose.Schema({
  text: String,
  post: String,
  post_id: String,
});

module.exports = mongoose.model('Tag', TagSchema);
