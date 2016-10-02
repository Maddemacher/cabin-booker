const moment = require('moment');

const q = require('q');

const userRepo = require(`${__dirname}/../data/userrepo.js`);

const sessionRepo = require(`${__dirname}/../data/sessionrepo.js`);

const logger = require(`${__dirname}/../services/logger.js`);


function deleteSession(sessionId) {
  return sessionRepo.deleteSessionById(sessionId);
}

function validateSession(sessionId) {
  const deferred = q.defer();

  sessionRepo.findSessionById(sessionId).then(session => {
    logger.log(`session found: ${session}`);

    if (!session) {
      logger.log('unable to locate session');

      deferred.reject();
      return;
    }

    if (moment().isAfter(session.expirationDate)) {
      logger.log('remove session : expired');

      sessionRepo.removeSessionById(session.id).then(() => {
        deferred.reject(session);
      });

      return;
    }

    deferred.resolve(session);
  });

  return deferred.promise;
}

function authenticate(user) {
  const deferred = q.defer();

  userRepo.FindUserByName(user.userName).then(persistedUser => {
    if (user.password === persistedUser.password) { // ska anv'nda hashes ist'llet egentligen
      sessionRepo.createSession(user).then(session => {
        logger.log(`Session created for user ${user}, session: ${session}`);

        if (session) {
          deferred.resolve(session);
          return;
        }

        deferred.reject();
      });

      return;
    }

    deferred.reject();
  });

  return deferred.promise;
}

exports.deleteSession = deleteSession;
exports.validateSession = validateSession;
exports.authenticate = authenticate;
