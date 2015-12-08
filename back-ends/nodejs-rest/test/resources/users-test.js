/* eslint max-nested-callbacks: 0*/
/* eslint no-undef: 0*/
'use strict';

let expect = require('chai').expect;
let request = require('supertest');
let mongoose = require('mongoose');
let mockgoose     = require('mockgoose');

describe('User routes', () => {
  let  app;

  beforeEach((done) => {
    app = require('../../app');
    mockgoose(mongoose);
    mongoose.connect(`mongodb://localhost/test`, done);
  });

  afterEach(() => {
    app.close();
  });

  it('should login a user', (done) => {
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
});

