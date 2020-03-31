import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

mongoose.Promise = global.Promise;

const connect = () => {
  dotenv.config({ path: `${__dirname}/../configurations/cosmosdb.env` });
  mongoose.set('debug', true);

  return mongoose.connect('mongodb://' + process.env.COSMOSDB_HOST + ':' + process.env.COSMOSDB_PORT + '/' + process.env.COSMOSDB_DBNAME + '?ssl=true&replicaSet=globaldb', {
    auth: {
      user: process.env.COSMODDB_USER,
      password: process.env.COSMOSDB_PASSWORD,
    }
  });
};

export { connect };
