'use strict';

let express = require('express');
let router = express.Router();

router.use('/', require('./login'));
router.use('/', require('./users'));

module.exports = router;
