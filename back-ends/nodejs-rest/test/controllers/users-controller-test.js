// jshint esversion: 6
import { expect } from 'chai';
import request from 'supertest';
import factory from '../factory.js';
import app from '../../app';
import { createDB, destroyDB } from '../test-helper';
import { getToken } from '../../app/utils/functions';


/** Users set up/teardown ****************************************/
describe('Users', () => {
  before((done) => {
    createDB(() => {
      done();
    });
  });

  after(() => {
    destroyDB();
  });


  describe('Create', () => {
    it('should register a user when given valid credentials', (done) => {
      let user = factory.buildSync('user');

      request(app)
      .post('/users')
      .send({user: user})
      .expect(200)
      .then((res) => {
        expect(res.body.user).to.be.an('object');
        done();
      });
    });

    it('should not register a user who already exists', (done) => {
      let user = factory.buildSync('user');

      user.save()
      .then((user) => {
        request(app)
        .post('/users')
        .send({user: user})
        .expect(400)
        .then((res) => {
          let x = JSON.parse(res.text);
          expect(x['errors']['email'][0]).to.exist;
          done();
        });
      });
    });
  });
});
