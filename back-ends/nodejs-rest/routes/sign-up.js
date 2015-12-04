'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User';
import helper from './helper';
let router = express.Router();

/**
* CREATE the individual User via POST request
*/
router.post('/', (req, res) => {
  // check to see if user already exists
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if (!user) {
      bcrypt.hash(req.body.password, 8, (err, hash) => {
        User.create({
          fName: req.body.fName,
          lName: req.body.lName,
          email: req.body.email.toLowerCase(),
          username: req.body.username.toLowerCase(),
          password: hash,
        });
      });

      helper.success(res);
    } else { helper.userExists(res); }
  });

});

module.exports = router;
