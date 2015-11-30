var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./../models/User');

router.get('/sign-up', function(req, res) {
  res.sendFile('sign-up.html', {root: 'public'});
});

router.post('/', function(req, res) {
  var hash = bcrypt.hashSync(req.body.password, 8);

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: hash,
  });

  res.send(req.body.username + ' has been created!');
});

module.exports = router;
