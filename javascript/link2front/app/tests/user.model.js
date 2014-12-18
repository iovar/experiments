var server = require('../../server'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var user;

describe('User model unit tests:', function() {
  //setup
  before(function(done) {
    server.listen(3000, function() {
      done();
    });
  });
  beforeEach(function() {
    user = new User({
      username: 'username',
      password: 'password',
      email: 'user@example.com'
    });
  });

  //test authentication
  describe('Testing authentication pre-save', function() {
    it('should throw a TypeError exception', function() {
      assert.throws(function() {
        user.authenticate('password');
      },TypeError);
    });
  });

  describe('Testing authentication post-save', function() {
    beforeEach(function(done) {
      user.save(function() {
        done();
      });
    });
    it('should pass authentication', function() {
      assert.ok(user.authenticate('password'));
    });
    it('should fail authentication', function() {
      assert.strictEqual(user.authenticate('wrongpassword'),false);
    });
    afterEach(function(done) {
      User.remove({username: 'username'}, function() {
        done();
      });
    });
  });

  //test name that exists
  describe('Test check a new username against the database',
  function() {
    it('should return without error', function(done) {
      User.nameExists('username', function(user) {
        assert.notStrictEqual(user, null);
        done();
      });
    });
    it('should not exist', function(done) {
      User.nameExists('username', function(user) {
        assert.strictEqual(user, false);
        done();
      });
    });
    it('should exist', function(done) {
      user.save(function() {
        User.nameExists('username', function(user) {
          assert.strictEqual(user, true);
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    user.remove(function() {
      done();
    });
  });
  //teardown
  after(function(done) {
    server.close(function() {
      done();
    });
  });
});
