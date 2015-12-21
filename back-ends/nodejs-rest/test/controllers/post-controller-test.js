/* eslint no-undef: 0*/
import { createDB, destroyDB } from '../test-helper';
import app from '../../app';
import { expect } from 'chai';
import request from 'supertest';

describe('Posts:', () => {
  before((done) => {
    createDB(done);
  });

  after(() => {
    destroyDB();
  });

  describe('Create', () => {
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
    xit('should allow a user to create a post');
    xit('should not allow someone with no account to create a post');
  });

  describe('Update', () => {
    xit('should allow a user to update a post he owns');
    xit('should allow a user to update a post he owns');
  });

  describe('Delete', () => {
    xit('should not allow a user to delete a post he does not own');
    xit('should not allow a user to delete a post he does not own');
  });
});
