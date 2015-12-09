/* eslint max-nested-callbacks: 0*/
/* eslint no-undef: 0*/
import { expect } from 'chai';
import request from 'supertest';
import { setupDB } from '../test-helper';
import User from '../../app/models/User';
import Factory from '../Factory.js';

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
    let user = {
      name: 'Bob Nolan',
      email: 'bob@bob.com',
      username: 'delicious',
      password: 'testtest',
    };

    request(app)
    .post('/sign-up')
    .set('Accept', /json/)
    .send(user)
    .expect(200)
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res.body.name).to.equal(user.name);
      expect(res.body).to.be.an('object');
      done();
    });
  });

  it('should not register a user that already exists', (done) => {
    Factory.create('user', (user) => {
      request(app)
      .post('/sign-up')
      .set('Accept', /json/)
      .send({
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
      })
      .expect(200)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.body.message).to.equal('Error: That user already exits.');
        expect(res.body).to.be.an('object');
      });
    });
  });

});

