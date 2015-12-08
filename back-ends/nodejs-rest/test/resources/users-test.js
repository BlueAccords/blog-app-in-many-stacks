/* eslint max-nested-callbacks: 0*/
/* eslint no-undef: 0*/
'use strict';

require('babel/register');

let expect = require('chai').expect;
let request = require('supertest');
let User = require('../../app/models/User');
let setupDB = require('../test-helper').setupDB;

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
    request(app)
    .post('/sign-up')
    .set('Accept', /json/)
    .send({
      fName: 'Test',
      lName: 'Last',
      email: 'test@test.com',
      username: 'testest',
      password: 'testtest',
    })
    .expect(200)
    .end((err, res) => {
      expect(err).to.equal(null);
      expect(res.body.message).to.equal('Successful request.');
      expect(res.body).to.be.an('object');
      done();
    });
  });

  it('should not register a user that already exists', (done) => {
    User.create({
      fName: 'Test',
      lName: 'Last',
      email: 'test@test.com',
      username: 'testtest',
      password: 'testtest',
    }).then((user) => {
      request(app)
      .post('/sign-up')
      .set('Accept', /json/)
      .send({
        fName: 'Test',
        lName: 'Last',
        email: 'test@test.com',
        username: 'testest',
        password: 'testtest',
      })
      .expect(200)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.body.message).to.equal('Error: That user already exits.');
        expect(res.body).to.be.an('object');
        done();
      });
    });
  });

});

