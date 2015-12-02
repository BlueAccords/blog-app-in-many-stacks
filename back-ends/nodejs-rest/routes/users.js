'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User';
let router = express.Router();

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
});

/**
* DELETE (via DELETE request) an individual User.
*/
router.delete('/:username', (req, res) => {
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
});

module.exports = router;
