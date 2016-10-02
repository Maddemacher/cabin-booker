const q = require('q');

const logger = require(`${__dirname}/../services/logger.js`);

const cabin = require(`${__dirname}/models/cabin.js`);

const mongomain = require(`${__dirname}/mongomain.js`);

let CabinModel;

function all() {
  logger.log('Retreiving all cabins');

  const deferred = q.defer();

  if (!CabinModel) {
    logger.log('Unable to retreive cabins, no model');
    deferred.reject();

    return deferred.promise;
  }

  CabinModel.find({}, (error, cabins) => {
    if (error) {
      logger.log(`Unable to retreive cabins error: ${error}`);
      deferred.reject();
      return;
    }

    deferred.resolve(cabins);
  });

  return deferred.promise;
}

function createCabin(cabinToCreate) {
  logger.log(`Trying to create cabin: ${cabinToCreate}`);

  const deferred = q.defer();

  if (!CabinModel) {
    logger.log(`Unable to create cabin: ${cabinToCreate} , no model`);
    deferred.reject();

    return deferred.promise;
  }

  const c = new CabinModel(cabinToCreate);
  c.save((error, createdCabin) => {
    if (error) {
      logger.log(`Unable to create cabin: ${createdCabin} , error: ${error}`);
      deferred.reject();
      return;
    }

    deferred.resolve(createdCabin);
  });

  return deferred.promise;
}

function deleteCabin(cabinName) {
  console.log(`delete called for cabin: ${cabinName}`);

  const deferred = q.defer();

  deferred.reject();
  return deferred.promise;
}

exports.all = all;
exports.deleteCabin = deleteCabin;
exports.createCabin = createCabin;

mongomain.connectionPromise.then(() => {
  CabinModel = cabin.getModel();
});
