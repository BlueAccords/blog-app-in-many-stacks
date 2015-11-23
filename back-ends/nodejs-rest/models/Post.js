var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  author_id: Number,
  date_created: Date,
  date_modified: Date,
});

module.exports = mongoose.model('Post', PostSchema);
