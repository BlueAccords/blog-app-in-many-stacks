'use strict';

import mongoose from 'mongoose';
let ObjectId = mongoose.Schema.Types.ObjectId;

let schema = new mongoose.Schema({
  text: { type: String, required: true },
  _post: { type: ObjectId, ref: 'Post' },
}, {
  timestamps: true,
});

schema.index({text: 1, _post: 1}, { unique: true });

module.exports = mongoose.model('Tag', schema);