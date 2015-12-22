/* eslint no-undef: 0*/

import { createDB, destroyDB } from '../test-helper';

describe('Comments', () => {
  before((done) => {
    createDB(done);
  });

  after(() => {
    destroyDB();
  });

  describe('Create', () => {
    xit('should allow a user to create a comment');
    xit('should not allow someone with no account to create a comment');
  });

  describe('Show', () => {
    xit('should get all comments by a given post ID');
  });

  describe('Update', () => {
    xit('should allow a user to update a comment he owns');
    xit('should not allow a user to update a comment he doesn\'t own');
  });

  describe('Delete', () => {
    xit('should  allow a user to delete a comment he owns');
    xit('should not allow a user to delete a comment he does not own');
  });
});
