const mongoMain = require(`${__dirname}/mongomain.js`);

const logger = require(`${__dirname}/../services/logger.js`);

const q = require('q');

const moment = require('moment');

const session = require(`${__dirname}/models/session.js`);

let SessionModel;

function findSessionById(id) {
  logger.log(`Trying to find session with id: ${id}`);
  const deferred = q.defer();

  if (!SessionModel) {
    logger.log(`Unable to find session with id: ${id} , No Model`);
    deferred.reject();
    return deferred.promise;
  }

  SessionModel.findOne({ id }, (error, foundSession) => {
    if (error || !foundSession) {
      logger.log(`Could not find session, error: ${error}, Id: ${id}`);
      deferred.reject();
      return;
    }

    deferred.resolve(foundSession);
  });

  return deferred.promise;
}

function getExpirationDate() {
  return moment().add(1, 'hour').toISOString();
}

function createSession(user) {
  logger.log(`Creating session for user: ${user}`);
  const deferred = q.defer();

  if (!SessionModel) {
    logger.log(`Unable to create session for user: ${user}, no model`);
    deferred.reject();
    return deferred.promise();
  }

  new SessionModel({
    id: user._id,
    expirationDate: getExpirationDate(),
    userRole: user.userRole,
  }).save((error, createdSession) => {
    if (error || !createdSession) {
      deferred.reject();
      return;
    }

    deferred.resolve(createdSession);
  });

  return deferred.promise;
}

function deleteSessionById(sessionId) {
  // TODO update with q promises

  return SessionModel.find({ id: sessionId }).remove().exec();
}

exports.createSession = createSession;
exports.findSessionById = findSessionById;
exports.deleteSessionById = deleteSessionById;

mongoMain.connectionPromise.then(() => {
  SessionModel = session.getModel();
});
