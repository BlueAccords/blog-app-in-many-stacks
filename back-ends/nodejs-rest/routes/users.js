'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User';
import config from './../config';
import jwt from 'jsonwebtoken';
import helper from './helper';
let router = express.Router();

/**
* Middleware to check for user tokens
*/
router.use((req, res, next) => {
  // token is assigned to any token passed through the body, head, or query
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  // if the token exists
  if (token) {
    // check to see if the token is valid
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) { helper.tokenFail(res) }
      else {
        // a new key is added to the request object
        // the new key has a value of the unencoded token payload (user info)
        req.decoded = decoded;
        next();
      }
    });
  } else { helper.tokenFail(res); }
});

/**
* LIST (GET request) all the Users in the DB.
*/
router.get('/', (req, res) => {
  User.find((err, users) => {
    if (users === null) { helper.noUserFound(res); }
    else { res.json(users); }
  });
});

/**
* READ (GET request) an individual User's infromation.
*/
router.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username, },
    (err, user) => {
      if (user === null) { helper.noUserFound(res); }
      else { res.json(user); }
  });
});

/**
* UPDATE an individual User via PUT request.
*/
router.put('/:username', (req, res) => {
  // check the value of the username in the route,
  // and the value of the username for the user requesting the update (token),
  // if they match, the current user IS the user matching the route,
  // which means we can allow the request to go through and update the info.
  if (req.decoded.username === req.params.username) {
    User.findOne({ username: req.params.username, },
      (err, user) => {
        if (user === null) { helper.noUserFound(res); }
        else {
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.email = req.body.email;
          user.username = req.body.username;
          user.password = bcrypt.hashSync(req.body.password, 8);

          user.save((err) => {
            if (err) { return err; }
            else { helper.success(res); }
          });
        }
    });
  } // do not allow users to update other users.
  else { helper.permissionDenied(res); }
});

/**
* DELETE (via DELETE request) an individual User.
*/
router.delete('/:username', (req, res) => {
  // view router.put. Same concept, but for deleting users.
  if (req.decoded.username === req.params.username) {
    User.findOne({ username: req.params.username, },
      (err, user) => {
        if (user === null) { helper.noUserFound(res); }
        else {
          user.remove();
          helper.success(res);
        }
      });
  } else { helper.permissionDenied(res); }
});

module.exports = router;
