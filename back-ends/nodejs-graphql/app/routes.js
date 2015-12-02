'use strict';

import express from 'express';
import root from './controllers/root';
import schema from './schema';
import user from './controllers/user';
import jwtMiddleware from './middlewares/jwt';
import graphqlHTTP from 'express-graphql';

let router = express.Router();

/*
 * OPEN ROUTES
 */
router.get('/', root.index);
router.post('/authenticate', user.authenticate);
router.post('/user', user.create);

/*
 * PROTECTED ROUTES - order matters. Protected routes need to be below
 * the jwtMiddleware line
 */
router.use(jwtMiddleware);
router.post('/graphql', graphqlHTTP((req) => ({
  schema,
  rootValue: {user: req.user},
  graphql: true,
})));


module.exports = router;
