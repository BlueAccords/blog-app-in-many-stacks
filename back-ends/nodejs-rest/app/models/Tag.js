'use strict';

import mongoose from 'mongoose';

let TagSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  posts: [{
    _id: mongoose.Schema.Types.ObjectId,
    url_path: String,
    title: String,
    body: String,
    user_id: mongoose.Schema.Types.ObjectId,
    date_modified: String,
    date_created: String,
  }],
});

module.exports = mongoose.model('Tag', TagSchema);
