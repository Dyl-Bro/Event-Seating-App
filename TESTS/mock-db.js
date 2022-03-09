const mongoose = require ('mongoose');
const {MongoMemoryServer} = require ('mongodb-memory-server');
const { MongoMemoryServerEvents } = require('mongodb-memory-server-core/lib/MongoMemoryServer');
const {MongoClient} = require ('mongodb').MongoClient;

const mongoServer = new MongoMemoryServer();

 module.exports.dbconnect = async () => {
    await mongoServer.start();
    const mongoUri = mongoServer.getUri();
    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    mongoose.connect(mongoUri, mongooseOpts, (err) => {
      if(err) console.log(err);
  });
};

module.exports.dbclose = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
};

module.exports.dbclear = async () => {
    const collections = mongoose.connection.collections;
    for(const key in collections) {
        await collections[key].deleteMany({});
    }
};

