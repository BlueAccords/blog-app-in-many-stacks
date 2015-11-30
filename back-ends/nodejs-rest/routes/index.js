var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var path = require('path');

router.use('/', require('./sign-in'));
router.use('/', require('./sign-up'));
router.use('/', require('./users'));

module.exports = router;
