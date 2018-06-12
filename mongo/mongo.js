const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/3-1';

MongoClient.connect(url, function (err, database) {
  if (err) console.log('Connection failed', err);
  else {
    console.log('Connection success: ' + url);

    insertInCollection(database, 'Anya', () => {
      database.close();
    });

    insertInCollection(database, 'Lena', () => {
      database.close();
    });

    insertInCollection(database, 'Aleksey', () => {
      database.close();
    });

    showCollection(database, () => {
      database.close();
    });

    renameInCollection(database, `Aleksey`, 'Alex', () => {
      database.close();
    });

    showCollection(database, () => {
      database.close();
    });

    deleteInCollection(database, 'Alex', () => {
      database.close();
    });

    showCollection(database, () => {
      database.close();
    });

    deleteInCollection(database, 'Aleksey', () => {
      database.close();
    });

    deleteAllInCollection(database, () => {
      database.close();
    });

    showCollection(database, () => {
      database.close();
    });
  }
});

const insertInCollection = (database, name, callback) => {
  const collection = database.db('3-1').collection(`users`);
  const user = {name: name};
  collection.insert([user], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`New user added:`, name);
      callback();
    }
  })
};

const showCollection = (database, callback) => {
  const collection = database.db('3-1').collection(`users`);
  collection.find({}).toArray((err, users) => {
    if (err) {
      console.log(err)
    } else if (users.length) {
      console.log('');
      console.log(`Users in collection: `);
      users.forEach(item => {
        console.log(item.name);
      });
      console.log('');
      callback();
    } else {
      console.log(`Collection is empty`);
      callback();
    }
  });
};

const renameInCollection = (database, oldName, newName, callback) => {
  const collection = database.db('3-1').collection(`users`);
  collection.updateOne({name: oldName}, {$set: {name: newName}}, (err, result) => {
    //console.log(result.result.n);
    if (err) {
      console.log(err);
    } else if (result.result.n === 1) {
      console.log(oldName, 'renamed on', newName);
      callback();
    } else if (result.result.n === 0) {
      console.log(oldName, 'not found');
      callback();
    }
  });
};

const deleteInCollection = (database, name, callback) => {
  const collection = database.db('3-1').collection(`users`);
  collection.deleteOne({name: name}, (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.result.n === 1) {
      console.log(name, `deleted`);
      callback();
    } else if (result.result.n === 0) {
      console.log(name, 'not found');
      callback();
    }
  });
};

const deleteAllInCollection = (database, callback) => {
  const collection = database.db('3-1').collection(`users`);
  collection.deleteMany({}, () => {
    console.log(`All users deleted`);
    callback();
  })
};