let mongoose = require('mongoose');
let mockgoose     = require('mockgoose');
import {Promise} from 'es6-promise';

module.exports.createDB = (done) => {
  mockgoose(mongoose);
  mongoose.connect('mongodb://localhost/test', done);
  return Promise.resolve();
};

module.exports.destroyDB = () => {
  mockgoose(mongoose);
  mongoose.connection.close();
  return Promise.resolve();
};
