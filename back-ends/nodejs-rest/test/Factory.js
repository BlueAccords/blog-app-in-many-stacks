import Factory from 'factory-lady';
import User from '../app/models/User';
import faker from 'faker';

Factory.define('user', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
});

module.exports = Factory;
