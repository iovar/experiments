var server = require('../../server'),
    assert = require('assert'),
    request = require('supertest'),
    userController = require('../controllers/user.js');

describe('User controller unit tests:', function() {
  describe('Route: /users', function() {
    it('GET: should return a list of existing users', function(done) {
      request(server)
        .get('/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if(err) {
            throw err;
          }
          done();
        });
    });
    it('POST: should create a new user', function(done) {
      request(server)
        .post('/users')
        .send({ name: 'test'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if(err) {
            throw err;
          }
          done();
        });
    });
  });
});
