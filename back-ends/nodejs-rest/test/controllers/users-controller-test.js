/* eslint max-nested-callbacks: 0*/
/* eslint no-undef: 0*/
import { expect } from 'chai';
import request from 'supertest';
import { createDB } from '../test-helper';
import factory from '../factory.js';
import app from '../../app';

describe('User requests', () => {
  before((done) => {
    createDB(done);
  });

  after(() => {
    app.close();
  });

  it('should register a user when given the correct credentials', (done) => {
    let user ={
      name: 'Bob Nolan',
      email: 'bob@bob.com',
      username: 'delicious',
      password: 'testtest',
    } ;

    request(app)
    .post('/users')
    .send({user: user})
    .expect(200)
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res.body.user.name).to.equal(user.name);
      expect(res.body.user).to.be.an('object');
      done();
    });
  });

  it('should not register a user that already exists', (done) => {
    factory.create('user')
    .then((user) => {
      request(app)
      .post('/users')
      .send({user: {
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
      }})
      .expect(400)
      .end((err, res) => {
        let x = JSON.parse(res.text);
        expect(x['errors']['email'][0]).to.equal('This Username or Email is already taken.');
        done();
      });
    });
  });

  xit('should allow a user to update his profile');
  xit('should not allow a user to update another user\'s profile');
  xit('should allow a user to delete his own profile');
  xit('should not allow a user to delete another user\'s profile');
});
