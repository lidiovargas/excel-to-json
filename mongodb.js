const MongoClient = require('mongodb').MongoClient;
const logger = require('./logger');

module.exports = function (app) {
  const uri = "mongodb+srv://lidiovargas:<password>@lidio-cluster0-dwklw.mongodb.net/test?retryWrites=true&w=majority";
  const dbName = "musicarchive";

  const promise = MongoClient.connect(uri, { useNewUrlParser: true }).then(client => {
    // For mongodb <= 2.2
    if(client.collection) {
      return client;
    }

    return client.db(dbName);
  }).catch(error => {
    logger.error(error);
  });

  app.set('mongoClient', promise);


    // const client = new MongoClient(uri, { useNewUrlParser: true });
    // client.connect(err => {
    //   const collection = client.db("test").collection("devices");
    //   // perform actions on the collection object
    //   client.close();
    // });
}