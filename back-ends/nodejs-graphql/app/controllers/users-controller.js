'use strict';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../../config/application';

module.exports.create = function(req, res) {
  bcrypt.hash(req.body.user.password, 8, (err, hash) => {
    let user = new User({
      name: req.body.user.name,
      email: req.body.user.email,
      username: req.body.user.username,
      password: hash,
    });

    user.save( (err) => {
      if (err) {
        //throw err;
        res.json(401, {error: 'A user with this email address already exists'});
      } else {
        res.send({
          user: {
            name: user.name,
            username: user.username,
            email: user.email,
          },
        });
      }
    });
  });
};

module.exports.authenticate = function(req, res) {
  // find the user
  User.findOne({
    email: req.body.user.email,
  }, (err, user) => {

    if (err) {
      throw err;
    }

    if (!user) {
      res.json(401, { success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      bcrypt.compare(req.body.user.password, user.password, (err, result) => {
        // check if password matches
        if (result !== true) {
          res.json(401, { success: false, message: 'Authentication failed. Wrong password.' });
        } else {

          // if user is found and password is right
          // create a token
          let token = jwt.sign(user, config.jwt.secret, {
            expiresIn: 1440 * 60, // expires in 24 hours (by seconds)
          });

          // return the information including token as JSON
          res.json({
            user: {
              email: user.email,
              name: user.name,
            },
            token,
          });
        }
      });
    }
  });
};