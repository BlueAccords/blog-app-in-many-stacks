'use strict';

import mongoose from 'mongoose';
let ObjectId = mongoose.Schema.Types.ObjectId;

import Promise from 'bluebird';
mongoose.Promise = Promise;

let schema = new mongoose.Schema({
  _author: { type: ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  url_path: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  tags: [{ type: ObjectId, ref: 'Tag' }],
},{
  timestamps: true,
});

module.exports = mongoose.model('Post', schema);
