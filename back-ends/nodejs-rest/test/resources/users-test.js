'use strict';

let expect = require('chai').expect;
let request = require('supertest');
let mongoose = require('mongoose');
let mockgoose = require('mockgoose');

mockgoose(mongoose);
let app = require('../../app');


describe('User routes', () => {
  it('should login a user', (done) => {
    request(app)
    .post('/sign-up')
    .send({
      fName: 'Test',
      lName: 'Last',
      email: 'test@test.com',
      username: 'testest',
      password: 'testtest',
    })
    .expect(200)
    .end((err, res) => {
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

