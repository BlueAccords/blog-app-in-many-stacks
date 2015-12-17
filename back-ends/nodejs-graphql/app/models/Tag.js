'use strict';

import mongoose from 'mongoose';

let schema = new mongoose.Schema({
  text: { type: String, required: true },
}, {
  timestamps: true,
});

schema.index({text: 1}, { unique: true });

module.exports = mongoose.model('Tag', schema);
