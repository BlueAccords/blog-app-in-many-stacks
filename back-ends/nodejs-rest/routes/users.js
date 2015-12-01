var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./../models/User');

/**
* New User form (DONE)
*/
router.get('/sign-up', function(req, res) {
  res.sendFile('sign-up.html', {root: 'public'});
});

/**
* CREATE the individual User via post request (DONE)
*/
router.post('/sign-up', function(req, res) {
  bcrypt.hash(req.body.password, 8, function(err, hash) {
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
router.get('/user/:username', function(req, res) {
  User.findOne({username: req.params.username}, function(err, user) {
    if (user === null) {
      res.send('no user found');
    } else res.json(user);
  });
});

/**
* UPDATE an individual User (DONE)
*/
router.put('/user/:username/edit', function(req, res) {
  User.findOne({username: req.params.username}, function(err, user) {
    if (user === null) res.send('no user found');

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.username = req.body.username;
    user.password = bcrypt.hashSync(req.body.password, 8);

    user.save(function(err) {
      if (err) return handleError(err);
      res.send('User has been updated');
    });
  });
});

/**
* DELETE an individual User (DONE)
*/
router.delete('/user/:username/edit', function(req, res) {
  User.findOne({username: req.params.username}, function(err, user) {
    if (user === null) res.send('no user found');

    user.remove();
    res.send('User has been removed');
  });
});

module.exports = router;
