let mongoose = require('mongoose');
let mockgoose     = require('mockgoose');
import {Promise} from 'es6-promise';

mockgoose(mongoose);

module.exports.createDB = (done) => {
  mongoose.connect('mongodb://localhost/test', done);
  return Promise.resolve();
};

module.exports.destroyDB = () => {
  mongoose.disconnect();
  return Promise.resolve();
};
