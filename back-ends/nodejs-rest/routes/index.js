'use strict';

import express from 'express';
let router = express.Router();

router.use((req, res, next) => {
  console.log('New action...');
  next();
});

router.use('/', require('./login')); // Public route: anyone can req.
router.use('/sign-up', require('./sign-up')); // Public route: anyone can req.
router.use('/user', require('./users')); // Private route: req will need token.
// router.use('/tags', require('./tags'));

module.exports = router;
