const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();

const mongoose = require('mongoose');
const db = mongoose.connection;
const Schema = mongoose.Schema;
const url = 'mongodb://localhost:27017/3-3';

const taskSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    desc: {
      type: String,
    },
    taskStatus: {
      type: Boolean,
      required: true,
      default: true
    },
    userID: {
      type: {
        type: String,
        required: false
      }
    }
  }),
  taskModel = mongoose.model('task', taskSchema);

app.get('/', (req, res) => {
  taskModel.find({}, (err, tasks) => {
    if (err) {
      res.send(err);
    } else {
      res.send(tasks);
    }
  });
});

app.post('/add', (req, res) => {
  const data = {
    name: req.body.name,
    desc: req.body.desc,
    taskStatus: req.body.status,
    user: req.body.user
  };
  taskModel.create(data, (err, task) => {
    if (err) {
      res.send(err);
    } else {
      console.log('task saved');
      res.send({status: 'OK', task: task});
    }
  });
});

app.put('/edit/:id', (req, res) => {
  const id = req.params.id;
  taskModel.findById(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (req.body.name) data.name = (data.name !== req.body.name) ? req.body.name : data.name;
      if (req.body.desc) data.desc = (data.desc !== req.body.desc) ? req.body.desc : data.desc;
      data.save();
      res.send(data);
    }
  });
});

app.put('/:id/delegateTo/:userID', (req, res) => {
  const id = req.params.id,
    userID = req.params.userID;
  taskModel.findById(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      data.userID = req.params.userID;
      data.save();
      res.send(data);
    }
  });
});

app.put('/changeStatus/:id', (req, res) => {
  const id = req.params.id;
  taskModel.findById(id, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      data.taskStatus = (!data.taskStatus);
      data.save();
      res.send(data);
    }
  });
});

app.delete('/del/:id', (req, res) => {
  const id = req.params.id;
  taskModel.findByIdAndRemove(id, err => {
    if (err) {
      res.send(err);
    } else {
      res.send('task deleted')
    }
  });
});