const mongodb = require(`mongodb`);
const MongoClient = mongodb.MongoClient;
const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`);
const ObjectId = require('mongodb').ObjectID;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

const url = `mongodb://localhost:27017/3-2`;
const router = express.Router();
const port = 1337;

router.post(`/users`, (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(`Connection failed`)
    } else {
      console.log(`Connection success`);

      const collection = db.collection(`user_database`);
      const user = {};
      user.name = req.body.name;
      user.lastname = req.body.lastname;
      user.phone = req.body.phone;

      collection.insertOne(user, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.end();
          console.log(`Contact added`);
        }
      })
    }
    db.close();
  });
});

router.post(`/users/find`, (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(`Connection failed`)
    } else {
      console.log(`Connection success`);

      const collection = db.collection(`user_database`);
      const user = {};
      user.name = req.body.name;
      user.lastname = req.body.lastname;
      user.phone = req.body.phone;

      if (user.name !== ``) {
        collection.find({name: user.name}).toArray((err, users) => {
          if (err) {
            console.log(`Can't read data`)
          } else if (users.length) {
            res.send(users);
            res.end();
          } else {
            res.send(`Contact not found`);
          }
        })
      } else if (user.lastname !== ``) {
        collection.find({lastname: user.lastname}).toArray((err, users) => {
          if (err) {
            console.log(`Can't read data`)
          } else if (users.length) {
            res.send(users);
            res.end();
          } else {
            res.send(`Contact not found`);
          }
        })
      } else {
        collection.find({phone: user.phone}).toArray((err, users) => {
          if (err) {
            console.log(`Can't read data`)
          } else if (users.length) {
            res.send(users);
            res.end();
          } else {
            res.send(`Contact not found`);
          }
        })
      }
    }
    db.close();
  });
});

router.get(`/users`, (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(`Connection failed`)
    } else {
      console.log(`Connection success`);

      const collection = db.collection(`user_database`);
      collection.find({}).toArray((err, users) => {
        if (err) {
          console.log(`Can't read data`)
        } else if (users.length) {
          res.send(users);
          res.end();

        } else {
          console.log(`database is empty`);
        }
      });
    }
    db.close();
  });
});

router.put(`/users`, (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(`Connection failed`)
    } else {
      console.log(`Connection success`);

      const collection = db.collection(`user_database`);
      const id = ObjectId(req.body.id);
      const name = req.body.name;
      const lastname = req.body.lastname;
      const phone = req.body.phone;


      collection.updateOne({_id: id}, {$set: {name: name, lastname: lastname, phone: phone}}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json({message: `Contact updated`});
          res.end();
          console.log(`Contact updated`);
        }
      });
    }
    db.close();
  });
});

router.delete(`/users`, (req, res) => {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(`Connection failed`)
    } else {
      console.log(`Connection success`);

      const collection = db.collection(`user_database`);
      const id = ObjectId(req.body.id);

      collection.deleteOne({_id: id}, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.json({message: `Contact deleted`});
          res.end();
          console.log(`Contact deleted`);
        }
      });
    }
    db.close();
  });
});

app.use(`/api/v1`, router);
app.use(express.static(__dirname + `/interface`));

app.use((req, res) => {
  res.status(404).send(req.originalUrl + ` not found`);
});

app.use((req, res) => {
  res.status(500).send(`Internal server error`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});