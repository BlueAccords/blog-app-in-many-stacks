'use strict';

let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let User = require('./../models/User');

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

  res.send('Your user has been created!');
});

/**
* READ an individual users infromation (DONE)
*/
router.get('/user/:username', (req, res) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if (user === null) {res.send('no user found');}
    else {res.json(user);}
  });
});

/**
* UPDATE an individual User (DONE)
*/
router.put('/user/:username/edit', (req, res) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if (user === null) {res.send('no user found');}

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, 8);

    user.save((err) => {
      if (err) {return err;}
      res.send('User has been updated');
    });
  });
});

/**
* DELETE an individual User (DONE)
*/
router.delete('/user/:username/edit', (req, res) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if (user === null) {res.send('no user found');}

    user.remove();
    res.send('User has been removed');
  });
});

module.exports = router;
