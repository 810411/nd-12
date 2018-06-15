const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();
const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;
const url = 'mongodb://localhost:27017/3-3';

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    }
  }),
  userModel = mongoose.model('user', userSchema);

app.get('/', (req, res) => {
  userModel.find({}, (err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
});

app.post('/add', (req, res) => {
  userModel.create({name: req.body.name}, err => {
    if (err) {
      res.send(err);
    } else {
      console.log('User saved');
      res.send({status: 'OK', user: req.body.name});
    }
  });
});

app.put('/edit/:id', (req, res) => {
  const id = req.params.id;
  userModel.findById(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      data.name = req.body.name;
      data.save();
      res.send(data);
    }
  });
});

app.delete('/del/:id', (req, res) => {
  const id = req.params.id;
  userModel.findByIdAndRemove(id, err => {
    if (err) {
      res.send(err);
    } else {
      res.send('User deleted')
    }
  });
});