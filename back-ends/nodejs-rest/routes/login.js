'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User';
let router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('login.html', {root: 'public'});
});

router.post('/', (req, res) => {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (user === null) {
      res.json({
        message: 'Please enter a valid username',
      });
    } else {
      // compare the attempted pw to the pw stored for the user
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          message: 'You are now logged in!',
        });
      } else {
        res.json({
          message: 'Invalid password, please try again.',
        });
      }
    }
  });
});

module.exports = router;
