/* eslint no-undef: 0*/
import { createDB, destroyDB } from '../test-helper';
import app from '../../app';
import { expect } from 'chai';
import factory from '../factory.js';
import request from 'supertest';
import { getToken } from '../../app/utils/functions';

describe('Posts:', () => {
  before((done) => {
    createDB(done);
  });

  after(() => {
    destroyDB();
  });

  describe('Create', () => {
    it('should allow a user to create a post', (done) => {
      factory.create('user')
      .then((user) => {
        let token = getToken(user);
        request(app)
        .post(`/posts`)
        .set('Authorization', `Bearer: ${token}`)
        .send({post: {
          title: 'Champion',
          body: 'Nice body',
        }})
        .expect(200)
        .end((err, res) => {
          expect(res.body.post.title).to.equal('Champion');
          done();
        });
      });
    });
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
