'use strict';

import config from '../../config/application';
import jwt from 'jsonwebtoken';
import User from '../models/User';

module.exports = function(req, res, next) {
  let token = null;

  // check header or url parameters or post parameters for token
  if(req.query.token) {
    token = req.query.token;
  } else if(req.headers['authorization']) {
    let x = req.headers['authorization'].split(' ');
    if(x[0] === 'Bearer:') {
      token = x[1];
    }
  }
  // decode token
  if(token) {
    // Turn off expiration of tokens if development
    let ignoreExpiration;
    process.env.NODE_ENV === 'development' ? ignoreExpiration = true : ignoreExpiration = false;

    jwt.verify(token, config.jwt.secret, {ignoreExpiration: ignoreExpiration}, (err, decoded) => {
      if(decoded) {
        return User.findOne({'_id': decoded._id})
        .then((user) => {
          req.currentUser = user;
          return next();
        });
      } else {
        return next();
      }
    });
  } else {
    return next();
  }
};
