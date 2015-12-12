'use strict';

import mongoose from 'mongoose';

let CommentSchema = new mongoose.Schema({
  // TODO update the schema
  // TODO post should be an Obj ID
  // TODO user should be obj ID
  // TODO text should be required
  post: String,
  user: String,
  text: String,
});

module.exports = mongoose.model('Comment', CommentSchema);
