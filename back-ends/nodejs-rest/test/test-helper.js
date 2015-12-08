let mongoose = require('mongoose');
let mockgoose     = require('mockgoose');

module.exports.setupDB = (done) => {
  mockgoose(mongoose);
  mongoose.connect('mongodb://localhost/test', done);
};
