'use strict';

import mongoose from 'mongoose';

import Promise from 'bluebird';
mongoose.Promise = Promise;

module.exports = mongoose.model('User', new mongoose.Schema({
  name: { type : String , required : true},
  email: { type : String , unique : true, required : true, dropDups: true},
  username: { type : String , unique : true, required : true, dropDups: true},
  password: { type : String , required : true},
},{
  timestamps: true,
}));
