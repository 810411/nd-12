const supertest = require('supertest');
const expect = require('chai').expect;

describe('REST API', () => {
  let server;

  before((done) => {
    require('../express/server');
    setTimeout(() => {
      server = supertest.agent('http://localhost:1337');
      done();
    }, 1000);
  });

  describe('REST /api/N1/users', function () {

    const user = {'id': 1, 'name': 'John', 'score': 100};
    const OK = 200;
    const ERROR = 400;
    let URL = '/api/N1/users';

    it('Successful user creation test', function (done) {
      server
        .post(URL).send(user).expect(OK, user)
        .end((err, res) => (err) ? done(err) : done());
    });

    it('Failed user creation test', function (done) {
      let failUser = {'id': 1, 'score': 1};
      server
        .post(URL).send(failUser).expect(ERROR, {})
        .end((err, res) => (err) ? done(err) : done());
    });

    it('Successful user delete test', function (done) {
      server
        .del(URL + '/1').expect(OK, user)
        .end((err, res) => (err) ? done(err) : done());
    });

    it('Failed user delete test', function (done) {
      server
        .del(URL + '/2').expect(ERROR, {})
        .end((err, res) => (err) ? done(err) : done());
    });
  });
});