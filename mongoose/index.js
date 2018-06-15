const express = require('express');
const bodyParser = require('body-parser');
const app = module.exports = express();

const mongoose = require('mongoose');
const db = mongoose.connection;
const url = 'mongodb://localhost:27017/3-3';

const api = require('./api');
const port = 1337;

mongoose.connect(url);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongoose сonnected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});