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
});

module.exports = mongoose.model('Tag', TagSchema);
