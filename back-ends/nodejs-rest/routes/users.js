var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var User = require('./../models/User');

router.get('/', function(req, res) {
  res.redirect('/');
});

// User dashboard. Only accessible by the unique user.
// If attempted to view without being the user, redirect to /posts
router.get('/:name', function(req, res) {
  res.send("You are viewing " + req.params.name + "'s profile!'");
});

// view other users posts.
// The defualt redirect if current user is !== :name
router.get('/:name/posts', function(req, res) {
  res.send("You are viewing " + req.params.name + "'s posts!'");
});

// view individual posts and their corresponding comments.
router.get('/:name/posts/:id', function(req, res) {
  res.send(req.params.name + "'s post no: " + req.params.id + "!");
});

router.post('/', function(req, res) {
  User.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null),
    },
    function(err, user) {
      if (err) return handleError(err);
      console.log(user);
    }
  );

  res.end('new user created');
});

module.exports = router;
