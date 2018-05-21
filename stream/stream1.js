const fs = require('fs');
const readStream = fs.createReadStream("dataread.txt");
const writeStream = fs.createWriteStream("datawrite.txt");

const crypto = require('crypto');
const hash = crypto.createHash('md5').setEncoding('hex');

readStream
  .pipe(hash)
  .pipe(process.stdout);

readStream
  .pipe(hash)
  .pipe(writeStream);