import userType from '../types/user-type';
import User from '../models/User';
import { Promise } from 'es6-promise';
import jwt from 'jsonwebtoken';
import config from '../../config/application';

import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  mutationWithClientMutationId,
  fromGlobalId,
} from 'graphql-relay';


let updateUserMutation = new mutationWithClientMutationId({
  name: 'UpdateUser',
  description: 'Update a user',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: GraphQLString},
    email: {type: GraphQLString},
    username: {type: GraphQLString},
  },
  outputFields: {
    user: {
      type: userType,
      resolve: (data) => {
        return User.findOne({'_id': data.userId})
          .then((user) => {
            return user;
          });
      },
    },
    token: {
      type: GraphQLString,
      resolve: (data) => {
        return User.findOne({'_id': data.userId})
        .then((user) => {
          const tokenOpts = {};
          // Makes sure tokens are deterministic on development
          if(process.env.NODE_ENV === 'development') {
            tokenOpts['noTimestamp'] = true;
          } else {
            tokenOpts['expiresIn'] = 1440 * 60;
          }

          let x = {
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
          };

          return jwt.sign(x, config.jwt.secret, tokenOpts);
        });
      },
    },
  },
  mutateAndGetPayload: (args, root) => {
    let user = root.rootValue.user;
    let id = fromGlobalId(args.id).id;

    if(String(user._id) !== id) {
      return Promise.reject('You do not have permissions to do this');
    }

    return User.update({_id: id}, args, {})
    .then((numAffected) => {
      if (numAffected.nModified > 0) {
        return {userId: id};
      } else {
        return Promise.reject('Something went wrong');
      }
    });

  },

});

module.exports = updateUserMutation;
