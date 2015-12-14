'use strict';

import mongoose from 'mongoose';

let CommentSchema = new mongoose.Schema({
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Comment', CommentSchema);
