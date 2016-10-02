const mongoose = require('mongoose');

const q = require('q');

const logger = require(`${__dirname}/../services/logger.js`);

const deferred = q.defer();
let initialized = false;

function init(config) {
  if (initialized) {
    throw new Error('Init is already called in mongomain.js');
  }

  initialized = true;

  const dbPath = `mongodb://${config.dbHost}:27017/${config.database}`;
  logger.log(`Trying to connect to: ${dbPath}`);

  mongoose.connect(dbPath, (_, error) => {
    if (error) {
      logger.log('connection error when connecting to repo', error);

      deferred.reject();
      return;
    }

    logger.log(`Successfully connected to ${dbPath}`);
    deferred.resolve();
  });
}

exports.init = init;
exports.handle = mongoose;
exports.connectionPromise = deferred.promise;
