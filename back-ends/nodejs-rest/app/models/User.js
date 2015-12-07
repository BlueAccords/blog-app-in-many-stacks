'use strict';

import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  username: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
