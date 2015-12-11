'user strict';

import config from '../../config';
// import helper from '../controllers/helper';
import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
  let token;
  try {
    // token is assigned to any token passed through the body, head, or query
    token = req.body.token || req.query.token || req.headers['authorization'].split(' ')[1];
  } catch(err) {
    token = null;
  }


  // if the token exists
  if (token) {
    // check to see if the token is valid
    jwt.verify(token, config.app.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          msg: 'Failed to authenticate token.',
        });
      } else {
        // a new key is added to the request object
        // the new key has a value of the unencoded token payload (user info)
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      msg: 'Failed to authenticate token.',
    });
  }
};
