'use strict';

import express from 'express';
import schema from './schema';
import user from './controllers/users-controller';
import jwtMiddleware from './middlewares/jwt';
import graphqlHTTP from 'express-graphql';
import path from 'path';

let router = express.Router();

/*
 * OPEN ROUTES
 */
router.route('/sign-in')
.post(user.authenticate);

router.route('/users')
.post(user.create);

// Graphiql exploratory interface
router.route('/graphiql')
.get((req,res) => {
  res.sendFile(path.join(__dirname+'/../graphiql/build/index.html'));
});
router.route('/graphiql.js')
.get((req,res) => {
  res.sendFile(path.join(__dirname+'/../graphiql/build/graphiql.js'));
});

/*
 * PROTECTED ROUTES - order matters. Protected routes need to be below
 * the jwtMiddleware line
 */
router.use(jwtMiddleware);

router.post('/graphql', graphqlHTTP((req) => ({
  schema,
  rootValue: {user: req.currentUser},
  graphql: true,
})));



module.exports = router;
