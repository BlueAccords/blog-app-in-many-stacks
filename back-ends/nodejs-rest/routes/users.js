'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User';
import config from './../config';
import jwt from 'jsonwebtoken';
let router = express.Router();

/**
* Middleware to check for user tokens
*/
router.use((req, res, next) => {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          message: 'Failed to authenticate this token.',
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      message: 'No token was supplied with this request.',
    });
  }
});

/**
* LIST (GET request) all the Users in the DB.
*/
router.get('/', (req, res) => {
  User.find((err, users) => {
    if (users === null) {
      res.json({
        message: 'No users exist YET.',
      });
    } else {
      res.json(users);
    }
  });
});

/**
* READ (GET request) an individual User's infromation.
*/
router.get('/:username', (req, res) => {
  User.findOne({
    username: req.params.username,
  }, (err, user) => {
    if (user === null) {
      res.json({
        message: 'This user does not exist.',
      });
    } else {
      res.json(user);
    }
  });
});

/**
* UPDATE an individual User via PUT request.
*/
router.put('/:username', (req, res) => {
  if (req.decoded.username === req.params.username) {
    User.findOne({
      username: req.params.username,
    }, (err, user) => {
      if (user === null) {
        res.json({
          message: 'This user does not exist.',
        });
      }

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.email = req.body.email;
      user.username = req.body.username;
      user.password = bcrypt.hashSync(req.body.password, 8);

      user.save((err) => {
        if (err) {
          return err;
        }

        res.json({
          message: 'This user has successfully been updated!',
        });
      });
    });
  } else {
    res.json({
      message: 'You cannot update any user info other than your own.'
    });
  }
});

/**
* DELETE (via DELETE request) an individual User.
*/
router.delete('/:username', (req, res) => {
  if (req.decoded.username === req.params.username) {
    User.findOne({
      username: req.params.username,
    }, (err, user) => {
      if (user === null) {
        res.json({
          message: 'This user does not exist.',
        });
      }

      user.remove();
      res.json({
        message: 'This user has successfully been deleted!',
      });
    });
  } else {
    res.json({
      message: 'You cannot delete any user other than yourself.'
    });
  }
});

module.exports = router;
