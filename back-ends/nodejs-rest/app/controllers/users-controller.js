'use strict';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';
import User from './../models/User';

module.exports.authenticate = (req, res) => {
  User.findOne({
    email: req.body.email.toLowerCase(),
  })
  .then(user => {
    console.log(user);
  });
};

module.exports.create = (req, res) => {
  User.find({$or: [
    {username: req.body.username.toLowerCase()},
    {email: req.body.email.toLowerCase()}
  ]})
  .then(users => {
    if (users.length === 0) {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
      });

      user.save();
      return user
    } else {
      res.json({
        msg: 'This Username or Email is already taken.',
      });
    }
  })
  .then(user => {
    let token = jwt.sign(user, config.jwt.secret, {
      expiresIn: 1440 * 60
    });

    res.json({
      user: user,
      token: 'Bearer ' + token,
    });
  })
};

module.exports.test = (req, res) => {}
