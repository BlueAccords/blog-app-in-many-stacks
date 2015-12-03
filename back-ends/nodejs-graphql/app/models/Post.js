'use strict';

import mongoose from 'mongoose';
let ObjectId = mongoose.Schema.Types.ObjectId;

let schema = new mongoose.Schema({
	_author: { type: ObjectId, ref: 'User', required: true },
	title: { type: String },
	body: { type: String, required: true }, 
},{
  timestamps: true,
});

module.exports = mongoose.model('Post', schema);