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

router.get('/edit', function(req, res) {
  
});

module.exports = router;
