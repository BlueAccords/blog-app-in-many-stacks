'use strict';

import mongoose from 'mongoose';

let UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);
