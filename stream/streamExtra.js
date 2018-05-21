const stream = require('stream');

class streamExtraReadable extends stream.Readable {
  _read(){
    this.push(Math.floor(Math.random() * 10).toString());
  }
}

class streamExtraWritable extends stream.Writable {
  _write(chunk, encoding, callback) {
    console.log(chunk.toString());
    if (typeof callback == 'function') callback();
  }
}

class streamExtraTransform extends stream.Transform {
  constructor(options) {
    super(options);
    this.counter = 1;
  }
  _transform(chunk, encodind, callback){
    setTimeout(() => {
      this.push(`${this.counter}. "${chunk}"`);
      this.counter++;
      if (typeof callback == 'function') callback();
    }, 1000);
  }
}

const readable = new streamExtraReadable;
const writable = new streamExtraWritable;
const transform = new streamExtraTransform;

readable
  .pipe(transform)
  .pipe(writable);

