/* eslint max-nested-callbacks: 0*/
/* eslint no-undef: 0*/
import { expect } from 'chai';
import request from 'supertest';
import { setupDB } from '../test-helper';
import factory from '../factory.js';

describe('User requests', () => {
  let  app;

  before((done) => {
    app = require('../../app');
    setupDB(done);
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
    .set('Accept', /json/)
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
      .set('Accept', /json/)
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

});

