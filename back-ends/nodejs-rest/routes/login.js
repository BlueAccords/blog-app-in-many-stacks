'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User';
let router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('login.html', {root: 'public'});
});

router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (user === null) { res.send('Enter a valid username'); }
    else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send('Now logged in');
      } else {
        res.send('Invalid password');
      }
    }
  });
});

module.exports = router;
