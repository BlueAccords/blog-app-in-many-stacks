'use strict';

import mongoose from 'mongoose';
let ObjectId = mongoose.Schema.Types.ObjectId;

let schema = new mongoose.Schema({
	_post: { type: ObjectId, ref: 'Post', required: true },
	text: { type: String, required: true }
}, {
	timestamps: true,
});

module.exports = mongoose.model('Tag', schema);