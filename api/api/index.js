"use strict"

const express       = require("express");
const bodyParser    = require("body-parser");
const app = module.exports = express();

app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());

//основное задание
app.use('/v1', require('./v1'));

//дополнительное задание, (P.S. поле score выставляется автоматически случайным числом)
app.use('/v2', require('./v2'));