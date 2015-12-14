'use strict';

import mongoose from 'mongoose';

let PostSchema = new mongoose.Schema({
  url_path: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [{
    tag_id: mongoose.Schema.Types.ObjectId,
    text: String,
  }],
  date_created: {
    type: Date,
    required: true,
    trim: true,
  },
  date_modified: {
    type: Date,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Post', PostSchema);
