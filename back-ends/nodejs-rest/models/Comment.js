var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  post_id: Number,
  author_id: Number,
  text: String,
});

model.exports = mongoose.model('Comment', CommentSchema);

/**
  It'd be dope if the comments updated in real time using socket.io
*/
