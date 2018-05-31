"use strict"

const express   = require("express");
const Users     = require("../../../model/users");
const User      = require("../../../model/user");
const random    = require("./random");
const MIN = 1;
const MAX = 10;

let users  = new Users();

const app = module.exports = express();

app.get('/', function(req, res) {
    users.findAll((err, users) => {
        send(res, err, users);
    }, req.query.offset, req.query.limit, req.query.fields);
});

app.post('/', function(req, res) {
    let usr = new User(req.body.name, random(MIN, MAX));
    users.add(usr, (err, user) => {
        send(res, err, user);
    });
});

app.get('/:id', function(req, res) {
    users.findById(req.params.id, (err, user) => {
        send(res, err, user);
    });
});

app.put('/:id', function(req, res) {
    users.findById(req.params.id, (err, user) => {
        if (err)
            return send(res, err);

        user.name = req.body.name;
        users.save(user, (err, user) => {
            send(res, err, user);
        });
    });
});

app.delete('/:id', function(req, res) {
    users.remove(req.params.id, (err, user) => {
        send(res, err, user);
    })
});

app.delete('/', function(req, res) {
    users.removeAll((err, users) => {
        send(res, err, users);
    })
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('500 Internal error - ' + err.message);
});

const send = (res, err, data) => {
    if (err)
        return res.status(400).send(err.message);

    res.status(200).json(data);
}