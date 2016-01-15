/* eslint no-undef: 0*/
import { createDB, destroyDB } from '../test-helper';
import app from '../../app';
import { expect } from 'chai';
import factory from '../factory.js';
import request from 'supertest';
import { getToken } from '../../app/utils/functions';

describe('Posts', () => {
  before((done) => {
    createDB(() => {
      done();
    });
  });

  after(() => {
    destroyDB();
  });

  describe('Create', () => {
    it('should allow a user to create a post', (done) => {
      let post = factory.buildSync('post');
      let user = factory.buildSync('user');

      user.save()
      .then((user) => {
        let token = getToken(user);

        request(app)
        .post(`/posts`)
        .set('Authorization', `Bearer: ${token}`)
        .send({post: post})
        .expect(200)
        .end((err, res) => {
          expect(res.body.post.title).to.equal(post.title);
          expect(res.body.post.body).to.equal(post.body);
          done();
        });
      });
    });
    xit('should not allow someone with no account to create a post');
  });

  describe('Show', () => {
    xit('should return a list of all posts');
    xit('should return a post by ID');
    xit('should return the post with a given url_path');
    xit('should return all posts by a given username');
    xit('should return all posts with a given tag');
  });

  describe('Update', () => {
    xit('should allow a user to update a post he owns');
    xit('should not allow a user to update a post he doesn\'t own');
  });

  describe('Delete', () => {
    xit('should allow a user to delete a post he owns');
    xit('should not allow a user to delete a post he does not own');
  });

  describe('Toggle tags', () => {
    xit('should add a tag to a post');
    xit('should remove a tag from a post');
  });
});
