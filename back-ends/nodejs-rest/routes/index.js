var express = require('express');
var router = express.Router();

router.use('/user', require('./users'));

router.get('/', function(req, res){
  console.log('on the home page');
  /**
    User goes to the home page and is prompted to sign in or
    sign up. If he clicks on sign up, he gets redirected to a
    new user form. If there is a session in memory it redirects
    to the users profile. /users/
  */
  res.send('Welcome to the home page');
});

module.exports = router;
