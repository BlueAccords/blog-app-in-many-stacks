/* eslint no-undef: 0*/
import { createDB, destroyDB } from '../test-helper';

describe('Tags', () => {
  before((done) => {
    createDB(done);
  });

  after(() => {
    destroyDB();
  });

  describe('Create', () => {
    xit('should allow a user to create a tag');
    xit('should not allow someone with no account to create a tag');
  });

  describe('Show', () => {
    xit('Should return a list of tags');
    xit('Get a tag based on given text');
  });

  describe('Update', () => {
    xit('should not allow a user to update a tag');
  });

  describe('Delete', () => {
    xit('should not allow a user to delete a tag');
  });
});
