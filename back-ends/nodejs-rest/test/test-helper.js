let mongoose = require('mongoose');
let mockgoose     = require('mockgoose');


mockgoose(mongoose);

module.exports.createDB = (done) => {
  mongoose.connect('mongodb://localhost/test', done);
};

module.exports.destroyDB = () => {
  mongoose.disconnect();
};
