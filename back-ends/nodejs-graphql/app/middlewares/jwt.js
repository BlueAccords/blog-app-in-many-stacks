'use strict';

import config from '../../config/application';
import jwt from 'jsonwebtoken';
import url from 'url';
import User from '../models/User';

module.exports = function(req, res, next) {
  let token;
  // check header or url parameters or post parameters for token
  try {
    token = req.query.token || req.headers['authorization'].split(' ')[1];

  } catch(err) {
    token = null;
  }
  // decode token
  // verifies secret and checks exp
  if(token) {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if('graphql' === url.parse(req.url).pathname.replace('/','')) {
        // We want the graphql endpoint to still be accessed but just with no data.
        User.findOne({'_id': decoded._id})
        .then((user) => {
          req.user = user;
          next();
        });
      } else if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, attach the decoded user data to the request so it can be
        // used later on.
        req.user = decoded;
        next();
      }
    });
  } else {
    next();
  }
};
