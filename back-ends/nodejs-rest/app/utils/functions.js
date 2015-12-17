import mongoose from 'mongoose';
import {Promise} from 'es6-promise'; 

let ObjectId = mongoose.Types.ObjectId;

/*
 * Returns an error if the specified object ID is bad.
 * @param {integer} id The id which will be tested
 * @returns {Promise}
 */
module.exports.filterBadObjectId = function(id) {
  try {
    return Promise.resolve(ObjectId(id));
  } catch (err) {
    throw 'Bad object ID';
  }
};
