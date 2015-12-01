var express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    path = require('path');

router.use('/', require('./login'));
router.use('/', require('./users'));

module.exports = router;
