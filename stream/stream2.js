const crypto = require('crypto');
const stream = require('stream');

class Converter extends stream.Transform {
  constructor(options) {
    super(options);
    this.hash = crypto.createHash('md5');
  }
  _transform(chunk, encoding, callback) {
    chunk = chunk.toString('hex');
    this.hash.update(chunk);
    if (typeof callback === 'function') callback();
  }
  _flush(callback) {
    let hex = this.hash.digest('hex');
    this.push(hex);
    if (typeof callback === 'function') callback();
  }
}

const fs = require('fs');
const readStream = fs.createReadStream("dataread.txt");
const writeStream = fs.createWriteStream("datawrite.txt");
let converter = new Converter;

readStream
  .pipe(converter)
  .pipe(process.stdout);

readStream
  .pipe(converter)
  .pipe(writeStream);