'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User';
let router = express.Router();

/**
* NEW User form. Simple GUI for tests.
*/
router.get('/', (req, res) => {
  res.sendFile('sign-up.html', {root: 'public'});
});

/**
* CREATE the individual User via POST request
*/
router.post('/', (req, res) => {
  bcrypt.hash(req.body.password, 8, (err, hash) => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: hash,
    });
  });

  res.json({
    message: 'This user has successfully been created!',
  });
});

module.exports = router;
