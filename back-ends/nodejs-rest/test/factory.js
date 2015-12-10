import factoryGirl from 'factory-girl';
import User from '../app/models/User';
import faker from 'faker';
import bluebird from 'bluebird';

let factory = factoryGirl.promisify(bluebird);

factory.define('user', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
});

export default factory;
