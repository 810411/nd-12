const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

app.get(`/`, (req, res) => {
  res.send(`Hello, Express.js`);
});

app.get(`/hello`, (req, res) => {
  res.send(`Hello, stranger!`);
});

app.get(`/hello/:name`, (req, res) => {
  res.send(`Hello, ${req.params.name}!`);
});

app.all(`/sub/*`, (req, res) => {
  res.send(`Your requested URI: ${req.originalUrl}`);
});

app.post(`/post`, (req, res) => {
  res.json(req.body);
});

app.use((req, res) => {
  res.status(404).send(req.originalUrl + ` not found`);
});

app.use((req, res) => {
  res.status(500).send(`Server error`)
});

app.listen(1337, () => {
  console.log(`Server started`)
});