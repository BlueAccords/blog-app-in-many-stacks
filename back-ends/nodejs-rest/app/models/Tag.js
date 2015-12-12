'use strict';

import mongoose from 'mongoose';

let TagSchema = new mongoose.Schema({
  // TODO update tag schema
  // TODO post should be obj id
  // TODO text should be required
  text: String,
  post: String,
});

module.exports = mongoose.model('Tag', TagSchema);
