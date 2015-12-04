'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User';
import jwt from 'jsonwebtoken';
import config from './../config';
import helper from './helper';
let router = express.Router();

/**
* A post request on the home page will set user authentication in motion.
*/
router.post('/', (req, res) => {
  // look for the user (based on username) in the DB
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (user === null) { helper.noUserFound(res); } // user does not exist.
    else {
        // compare the attempted pw to the pw stored for the user
      if (bcrypt.compareSync(req.body.password, user.password)) {
          //Create a new token, passing in the user IF pw is correct
        let token = jwt.sign(user, config.secret, {
          expiresIn: 1440 * 60,
        });

        res.json({
          message: 'A token has been passed. You are now logged in!',
          token,
        }); // v- User exists but pw is incorrect. -v
      } else { helper.permissionDenied(res); }
    }
  });
});

module.exports = router;
