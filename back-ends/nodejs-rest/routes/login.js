'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User';
import jwt from 'jsonwebtoken';
import config from './../config';
let router = express.Router();

/**
* Arrive at home page. This will prompt the user to log in.
*/
router.get('/', (req, res) => {
  res.sendFile('login.html', {root: 'public'});
});

/**
* A post request on the home page will set user authentication in motion.
*/
router.post('/', (req, res) => {
  // look for the user (based on username) in the DB
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (user === null) {
      // user does not exist.
      res.json({
        message: 'Please enter a valid username. Or create a new user.',
      });
    } else {
      // compare the attempted pw to the pw stored for the user
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //User exists and the password is correct.
        //Create a new token, passing in the user
        let token = jwt.sign(user, config.secret, {
          expiresIn: 1440 * 60,
        });

        res.json({
          message: 'A token has been passed. You are now logged in!',
          token: token,
        });
      } else {
        // User exists but the password is incorrect.
        res.json({
          message: 'Invalid password, double check and try again!',
        });
      }
    }
  });
});

module.exports = router;
