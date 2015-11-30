var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
});

UserSchema.methods.comparePassword = function(attempt) {
  if (bcrypt.compareSync(attempt, this.password)) {
    return true;
  } else {
    return false;
  }
}

module.exports = mongoose.model('User', UserSchema);
