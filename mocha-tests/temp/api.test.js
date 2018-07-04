let api = require('../api');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('Server', () => {
  it('Создание пользователя через POST-запрос', (done) => {
    let user = {
      name: 'Ann',
      score: '200'
    };

    chai.request(api)
      .post('/rest/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('newUser');
        res.body.newUser.should.deep.equal(user);
        done();
      });
  });

  it('Создание пользователя через POST-запрос без имени выбросит ошибку', (done) => {
    let user = {
      name: '',
      score: '200'
    };

    chai.request(api)
      .post('/rest/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('Создание пользователя через POST-запрос без счета выбросит ошибку', (done) => {
    let user = {
      name: 'Ann',
      score: ''
    };

    chai.request(api)
      .post('/rest/users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

  it('Удаление пользователя через DELETE-запрос', (done) => {
    let userName = 'Ann';

    chai.request(api)
      .delete(`/rest/users/${userName}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('deletedUser');
        res.body.deletedUser.name.should.be.equal(userName);
        done();
      });
  });

  it('Удаление пользователя через DELETE-запрос без имени выбросит ошибку', (done) => {
    let userName = '';

    chai.request(api)
      .delete(`/rest/users/${userName}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('Удаление пользователя через DELETE-запрос с несуществующим именем выбросит ошибку', (done) => {
    let userName = '___';

    chai.request(api)
      .delete(`/rest/users/${userName}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        done();
      });
  });

});