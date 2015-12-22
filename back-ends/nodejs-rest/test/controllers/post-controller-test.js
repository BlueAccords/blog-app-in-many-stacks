/* eslint no-undef: 0*/
import { createDB, destroyDB } from '../test-helper';
import app from '../../app';
import { expect } from 'chai';
import factory from '../factory.js';
import request from 'supertest';
import { getToken } from '../../app/utils/functions';

describe('Posts', () => {
  let user1;
  let user2;

  let newPost1;

  before((done) => {
    createDB(() => {
      factory.createMany('user', 2)
      .then((users) => {
        user1 = users[0];
        user2 = users[1];
        return factory.buildMany('post', 2);
      })
      .then((posts) => {
        newPost1 = posts[0];

        done();
      });
    });
  });

  after(() => {
    destroyDB();
  });

  describe('Create', () => {
    it('should allow a user to create a post', (done) => {
      let token = getToken(user1);

      request(app)
      .post(`/posts`)
      .set('Authorization', `Bearer: ${token}`)
      .send({post: newPost1})
      .expect(200)
      .end((err, res) => {
        expect(res.body.post.title).to.equal(newPost1.title);
        expect(res.body.post.body).to.equal(newPost1.body);
        done();
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
