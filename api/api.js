const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

let users = [];

const RPC = {

  getUsers: () => {
    return users;
  },

  getUser: (userId) => {
    return users[userId];
  },

  createUser: (name, score) => {
    const user = {};
    user.id = users.length;
    user.name = name;
    user.score = score;
    users.push(user);
  },

  changeUser: (userId, name, score) => {
    users[userId].name = name;
    users[userId].score = score;
  },

  deleteUser: (userId) => {
    users.splice(userId, 1);
  }
};

const router1 = express.Router();
const router2 = express.Router();

router1.get(`/users`, (req, res) => {
  res.json(users);
});

router1.post(`/users`, (req, res) => {
  const user = {};
  user.id = users.length;
  user.name = req.query.name;
  user.score = req.query.score;
  users.push(user);
  res.json({message: `User created`});
});

router1.get(`/users/:id`, (req, res) => {
  res.send(users[req.params.id]);
});

router1.put(`/users/:id`, (req, res) => {
  users[req.params.id].name = req.query.name;
  users[req.params.id].score = req.query.score;
  res.json({message: `User updated`});
});

router1.delete(`/users/:id`, (req, res) => {
  users.splice(req.params.id, 1);
  res.json({message: `User deleted`});
});

router2.post(`/`, (req, res) => {
  const method = RPC[req.body.method];
  switch (req.body.method) {
    case `getUsers`:
      res.json({result: method(), id: req.body.id});
      break;
    case `getUser`:
      res.json({result: method(req.body.params[0]), id: req.body.id});
      break;
    case `createUser`:
      method(req.body.params[0], req.body.params[1]);
      res.json({result: `User created`, id: req.body.id});
      break;
    case `changeUser`:
      method(req.body.params[0], req.body.params[1], req.body.params[2]);
      res.json({result: `User updated`, id: req.body.id});
      break;
    case `deleteUser`:
      method(req.body.params[0]);
      res.json({result: `User deleted`, id: req.body.id});
      break;
    default:
      res.json({result: `Wrong method`, id: req.body.id});
  }
});

app.use(`/api/v1`, router1);
app.use(`/rpc`, router2);


app.use((req, res) => {
  res.status(404).send(req.originalUrl + ` not found`);
});

app.use((req, res) => {
  res.status(500).send(`Server error`)
});

app.listen(1337, () => {
  console.log(`Server started`)
});