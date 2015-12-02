'use strict';

import express from 'express';
let router = express.Router();

router.use((req, res, next) => {
  console.log('New action...');
  next();
});
router.use('/', require('./login'));
router.use('/sign-up', require('./sign-up'));
router.use('/user', require('./users'));

module.exports = router;
