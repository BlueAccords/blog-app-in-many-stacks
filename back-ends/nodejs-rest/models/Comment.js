var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({});

model.exports = mongoose.model('Comment', CommentSchema);

/**
  It'd be dope if the comments updated in real time using socket.io
*/
