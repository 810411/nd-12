"use strict"

const express       = require("express");
const RPC           = require("./methods");
const bodyParser    = require("body-parser");
const RPC_VERSION   = '2.0';

const app = module.exports = express();

const error = (eCode, eMessage, eData) => {
    return {
        code: eCode,
        message: eMessage,
        data: (eData) ? eData.message : null
    }
}

const METHOD_NOT_FOUND  = error(-32601, 'Method not found');
const BAD_REQUEST_ERROR = error(-32600, 'Bad Request. JSON RPC version is invalid or missing');
const PARSE_ERROR       = error(-32700, 'Parse error');

const failed = (err) => {
    return error(-32603, 'Failed', err);
}

const exception = (e) => {
    return error(-32603, 'Exception at method call', e);
}

const sendError = (res, err, statusCode) => {
    res.status(statusCode).json({
        jsonrpc: RPC_VERSION,
        error: err
    });
}

const sendOK = (res, result) => {
    res.status(200).json({
        jsonrpc: RPC_VERSION,
        result: result,
        error : null,
        id: (result.id) ? result.id : null
    });
}

app.use(bodyParser.json());
app.use(function(err, req, res, next) {
    sendError(res, PARSE_ERROR, 500);
});

app.post('/', (req, res) => {
    let data = req.body;

    const rpcMethod = RPC[data.method];

    if (data.jsonrpc !== RPC_VERSION) {
        return sendError(res, BAD_REQUEST_ERROR, 400);
    }
    if (!rpcMethod) {
        return sendError(res, METHOD_NOT_FOUND, 404);
    }

    try {
        rpcMethod(req.body.id, req.body.params, (err, result) => {
            (err) ? sendError(res, failed(err), 500) :
                sendOK(res, result)
        });
    } catch (e) {
        sendError(res, exception(e), 500);
    }

})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    sendError(res, exception(err), 500);
});