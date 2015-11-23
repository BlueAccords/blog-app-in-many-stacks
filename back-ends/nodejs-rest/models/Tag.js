var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
  post_id: Number,
  text: String,
});

module.exports = mongoose.model('Tag', TagSchema);
