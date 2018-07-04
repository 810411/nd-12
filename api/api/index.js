"use strict"

const express = require("express");
const app = module.exports = express();

app.use('/N1', require('./N1'));