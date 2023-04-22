const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('') // enter your mongo credentials here
  .then(client => {
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log(err)
  })
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database Found";
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDb = getDb;

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Afaq:<password>@cluster0.o6gexs0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
