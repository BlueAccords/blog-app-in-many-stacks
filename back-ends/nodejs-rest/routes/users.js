var express = require('express');
var router = express.Router();
var User = require('./../models/User');

router.get('/user/:username', function(req, res) {
  User.findOne({username: req.params.username}, function(err, user) {
    if (user === null) {
      res.send('no user found');
    } else res.json(user);
  });
});

router.put('/user/:username/edit', function(req, res) {
  User.findOne({username: req.params.username}, function(err, user) {
    if (user === null) {
      res.send('no user found');
    } else {
      user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      }, function(err, updated) {
        if (err) res.send(err)
        else res.json(updated);
      })
    };
  });
});

module.exports = router;
