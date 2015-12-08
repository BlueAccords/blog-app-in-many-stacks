/* eslint max-nested-callbacks: 0*/
/* eslint no-undef: 0*/
'use strict';

let expect = require('chai').expect;
let request = require('supertest');
let mongoose = require('mongoose');
let mockgoose     = require('mockgoose');

describe('User routes', () => {
  let  app;

  before((done) => {
    app = require('../../app');
    mockgoose(mongoose);
    mongoose.connect(`mongodb://localhost/test`, done);
  });

  after(() => {
    app.close();
  });

  it('should login a user', (done) => {
    request(app)
    .post('/sign-up')
    .field('fName', 'my awesome avatar')
    .expect(200)
    .end((err, res) => {
      console.log(err);
      console.log(res.body);
      console.log(res.body);
      //expect(err).to.equal(null);
      //expect(res.body.success).to.equal(true);
      //expect(res.body.user).to.be.an('object');
      //expect(res.body.user.email).to.equal('test@test.com');
      //expect(res.body.user.password).to.equal(undefined);
      done();
    });
  });
});

