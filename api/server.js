"use strict"

const express       = require("express");
const bodyParser    = require("body-parser");
const api           = require("./api");

const PORT          = (process.env && process.env.PORT) || 1337;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));

app.use('/api', api);

app.all('*', (req, res) => {
   res.send('ok');
});

app.listen(PORT, () => {
    console.log('Start HTTP on port %d', PORT);
});
app.on('error', err => console.error(err));
