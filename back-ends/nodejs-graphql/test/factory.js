import factoryGirl from 'factory-girl';
import User from '../app/models/User';
import Post from '../app/models/Post';
import faker from 'faker';
import bluebird from 'bluebird';

let factory = factoryGirl.promisify(bluebird);

factory.define('user', User, {
  name: () => faker.name.findName(),
  email: () => faker.internet.email(),
  username: () => faker.internet.userName(),
  password: () => faker.internet.password(),
});

factory.define('post', Post, {
  title: () => faker.lorem.sentence(),
  body: () => faker.lorem.paragraphs(),
  url_path: function() {
    return this.title.replace(/\s/g, '-') + Date.now();
  },
});

export default factory;
