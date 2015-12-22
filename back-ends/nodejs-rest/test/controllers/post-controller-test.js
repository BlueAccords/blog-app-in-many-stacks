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

  before((done) => {
    createDB(() => {
      factory.createMany('user', 2)
      .then((users) => {
        user1 = users[0];
        user2 = users[1];
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
      let newPost = factory.buildSync('post');

      request(app)
      .post(`/posts`)
      .set('Authorization', `Bearer: ${token}`)
      .send({post: newPost})
      .expect(200)
      .then((res) => {
        expect(res.body.post.title).to.equal(newPost.title);
        expect(res.body.post.body).to.equal(newPost.body);
        done();
      });
    });

    it('should not allow someone with no account to create a post', (done) => {
      let newPost = factory.buildSync('post');

      request(app)
      .post(`/posts`)
      .send({post: newPost})
      .expect(401)
      .then((res) => {
        done();
      });
    });
  });

  describe('Update', () => {
    it('should allow a user to update a post he owns', (done) => {
      let token = getToken(user1);
      let updatedPost = factory.buildSync('post');
      factory.create('post', {'_author': user1._id})
      .then((post) => {
        request(app)
        .put(`/posts/${post._id}`)
        .set('Authorization', `Bearer: ${token}`)
        .send({post: updatedPost})
        .expect(200)
        .then((res) => {
          expect(res.body.post.title).to.equal(updatedPost.title);
          done();
        });
      });
    });
    it('should not allow a user to update a post he does not own', (done) => {
      let token = getToken(user2);

      factory.create('post', {'_author': user1._id})
      .then((post) => {
        request(app)
        .put(`/posts/${post._id}`)
        .set('Authorization', `Bearer: ${token}`)
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
    it('should allow a user to delete a post he owns', (done) => {
      let token = getToken(user1);
      factory.create('post', {'_author': user1._id})
      .then((post) => {
        request(app)
        .del(`/posts/${post._id}`)
        .set('Authorization', `Bearer: ${token}`)
        .expect(200)
        .then((res) => {
          expect(res.body.deleted_id).to.equal(post._id.toString());
          done();
        });
      });
    });
    it('should not allow a user to delete a post he does not own', (done) => {
      let token = getToken(user2);

      factory.create('post', {'_author': user1._id})
      .then((post) => {
        request(app)
        .del(`/posts/${post._id}`)
        .set('Authorization', `Bearer: ${token}`)
        .expect(401)
        .end((err, res) => {
          let x = JSON.parse(res.text);
          expect(x['errors']['permissions'][0]).to.exist;
          done();
        });
      });
    });
  });
});
