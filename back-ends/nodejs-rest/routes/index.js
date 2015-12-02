'use strict';

import express from 'express';
let router = express.Router();

router.use((req, res, next) => {
  console.log('New action...');
  next();
});
router.use('/', require('./login'));
router.use('/', require('./users'));

module.exports = router;
