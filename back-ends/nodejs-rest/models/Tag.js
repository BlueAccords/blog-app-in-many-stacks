'use strict';

import mongoose from 'mongoose';

let TagSchema = new mongoose.Schema({
  post: String,
  text: String,
});

module.exports = mongoose.model('Tag', TagSchema);
