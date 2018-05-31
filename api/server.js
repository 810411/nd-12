"use strict"

const express       = require("express");
const api           = require("./api");
const rpc           = require("./rpc");

const PORT          = (process.env && process.env.PORT) || 1337;

const app = express();

app.use('/api', api);
app.use('/rpc', rpc);

app.all('*', (req, res) => {
   res.send('ok');
});

app.listen(PORT, () => {
    console.log('Start HTTP on port %d', PORT);
});
app.on('error', err => console.error(err));