'use strict';

import express from 'express';
import bcrypt from 'bcrypt';
import User from './../models/User';
let router = express.Router();

/**
* New User form (DONE)
*/
router.get('/sign-up', (req, res) => {
  res.sendFile('sign-up.html', {root: 'public'});
});

/**
* CREATE the individual User via post request (DONE)
*/
router.post('/sign-up', (req, res) => {
  bcrypt.hash(req.body.password, 8, (err, hash) => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: hash,
    });
  });

  res.json({message: 'This user has successfully been created!'});
});

/**
* LIST all the Users in the DB (DONE)
*/
router.get('/user', (req, res) => {
  User.find((err, users) => {
    if (users === null) {res.json({message: 'No users exist YET.'});}
    else {res.json(users);}
  });
});

/**
* READ an individual User's infromation (DONE)
*/
router.get('/user/:username', (req, res) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if (user === null) {res.json({message: 'This user does not exist.'});}
    else {res.json(user);}
  });
});

/**
* UPDATE an individual User (DONE)
*/
router.put('/user/:username', (req, res) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if (user === null) {res.json({message: 'This user does not exist.'});}

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, 8);

    user.save((err) => {
      if (err) {return err;}
      res.json({message: 'This user has successfully been updated!'});
    });
  });
});

/**
* DELETE an individual User (DONE)
*/
router.delete('/user/:username', (req, res) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if (user === null) {res.json({message: 'This user does not exist.'});}

    user.remove();
    res.json({message: 'This user has successfully been deleted!'});
  });
});

module.exports = router;
