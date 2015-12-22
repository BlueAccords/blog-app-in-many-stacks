/* eslint max-nested-callbacks: 0*/
/* eslint no-undef: 0*/
import { expect } from 'chai';
import request from 'supertest';
import factory from '../factory.js';
import app from '../../app';
import { createDB, destroyDB } from '../test-helper';
import { getToken } from '../../app/utils/functions';

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
    it('should register a user when given the correct credentials', (done) => {
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

    it('should not register a user that already exists', (done) => {
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

  describe('Show', () => {
    it('should return the given user by id', (done) => {
      factory.create('user')
      .then((user) => {
        request(app)
        .get(`/users/${user._id}`)
        .expect(200)
        .then((res) => {
          expect(res.body.user.name).to.equal(user.name);
          expect(res.body.user.email).to.equal(user.email);
          expect(res.body.user.username).to.equal(user.username);
          done();
        });
      });
    });
    xit('should return a user by a given username');
  });

  describe('Update', () => {
    it('should allow a user to update his profile', (done) => {
      let user = factory.buildSync('user');
      let updatedUser = factory.buildSync('user');

      user.save()
      .then((user) => {
        let token = getToken(user);

        request(app)
        .put(`/users/${user._id}/?token=${token}`)
        .send({user: updatedUser})
        .expect(200)
        .then((res) => {
          expect(res.body.user.name).to.equal(updatedUser.name);
          expect(res.body.user.email).to.equal(updatedUser.email);
          expect(res.body.user.username).to.equal(updatedUser.username);
          done();
        });
      });
    });

    it('should not allow a user to update another\'s profile', (done) => {
      let user1;
      let user2;

      factory.createMany('user', 2)
      .then((users) => {
        user1 = users[0];
        user2 = users[1];
      })
      .then((user) => {
        let token = getToken(user1);

        request(app)
        .put(`/users/${user2._id}/?token=${token}`)
        .expect(401)
        .end((err, res) => {
          let x = JSON.parse(res.text);
          expect(x['errors']['permissions'][0]).to.exist;
          done();
        });
      });
    });
  });

  describe('Delete', () => {
    xit('should allow a user to delete his own profile');
    xit('should not allow a user to delete another user\'s profile');
  });
});
