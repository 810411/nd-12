const http = require('http');
const fs = require('fs');
const qs = require("querystring");
const https = require('https');
const port = 3000;
const hostName = '127.0.0.1';
const key = 'trnsl.1.1.20160723T183155Z.f2a3339517e26a3c.d86d2dc91f2e374351379bb3fe371985273278df';
const lang = 'ru-en';

let options = {};
let translate = '';

const server = http.createServer(function (req, res) {
  if (req.method == 'GET') {
    index(res);
  }
  else if (req.method == 'POST') {
    let body = '';
    req.setEncoding("utf8");
    req.on("data", (data) => {
      body += data;
      if (body.length > 1e6) {
        req.connection.destroy();
      }
    });
    req.on("end", () => {
      let post = qs.parse(body);
      let urlParams = qs.stringify({key: key, text: post.description, lang: lang});
      options = {
        hostname: 'translate.yandex.net',
        path: '/api/v1.5/tr.json/translate?' + urlParams,
        method: 'post'
      };
      let request = https.request(options, handler);
      request.end(response(res));
    });
  }
});

function index(res) {
  fs.readFile('index.html', function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    res.write(data);
    res.end();
  });
}

function response(res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': translate.length
  });
  res.write(translate);
  res.end();
}

function handler(response) {
  let data = '';
  response.on('data'
    , function (chunk) {
      data += chunk;
    });
  response.on('end'
    , function () {
      translate = data;
      console.log(translate);
    });
}

server.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}/`);
});