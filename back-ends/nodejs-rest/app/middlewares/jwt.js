'user strict';

import config from '../../config';
import helper from '../controllers/helper';
import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
  // token is assigned to any token passed through the body, head, or query
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // if the token exists
  if (token) {
    // check to see if the token is valid
    jwt.verify(token, config.app.secret, (err, decoded) => {
      if (err) {
        helper.tokenFail(res);
      } else {
        // a new key is added to the request object
        // the new key has a value of the unencoded token payload (user info)
        req.decoded = decoded;
        next();
      }
    });
  } else {
    helper.tokenFail(res);
  }
};
