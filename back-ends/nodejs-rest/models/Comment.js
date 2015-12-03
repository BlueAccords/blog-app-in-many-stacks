'use strict';

import mongoose from 'mongoose';

let CommentSchema = new mongoose.Schema({
  post: String,
  user: String,
  text: String,
});

module.exports = mongoose.model('Comment', CommentSchema);
