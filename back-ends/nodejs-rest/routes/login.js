var express = require('express'),
    router = express.Router(),
    User = require('./../models/User');

router.get('/', function(req, res) {
  res.sendFile('login.html', {root: 'public'});
});

router.post('/', function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if (user === null) {
      res.send('Enter a valid username')
    } else if (user.comparePassword(req.body.password)) {
      res.send('Now logged in');
    } else {
      res.send('Invalid password');
    }
  });
});

module.exports = router;
