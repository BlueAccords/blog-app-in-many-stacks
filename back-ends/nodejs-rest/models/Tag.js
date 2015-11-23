var mongoose = require('mongoose');
var Schema = mongoose.Schema

var TagSchema = new Schema({});

module.exports = mongoose.model('Tag', TagSchema);
