import jwt from 'jsonwebtoken';
import config from '../../config/application';

/*
 * Returns a valid JSON web token given a user object
 * @param {Object} user
 * @returns {string}
 */
export let getToken = ((user) => {
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
