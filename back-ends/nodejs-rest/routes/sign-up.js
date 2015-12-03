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
  bcrypt.hash(req.body.password, 8, (err, hash) => {
    User.create({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      username: req.body.username,
      password: hash,
    });
  });

  helper.success(res);
});

module.exports = router;
