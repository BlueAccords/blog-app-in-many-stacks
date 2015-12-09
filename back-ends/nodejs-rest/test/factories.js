import Factory from 'factory-lady';
import User from '../app/models/User';

Factory.define('user', User, {
  name: '',
  email: '',
  username: '',
  password: '',
});

module.exports = Factory;
