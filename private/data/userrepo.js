const q = require('q');

const logger = require(`${__dirname}/../services/logger.js`);

const mongoMain = require(`${__dirname}/mongomain.js`);

const user = require(`${__dirname}/models/user.js`);

let Model;

function createUser(userToCreate) {
  logger.log(`Trying to create user ${userToCreate}`);

  const deferred = q.defer();

  if (!Model) {
    logger.log('Unable to create user, model is undefined');
    deferred.reject();
    return deferred.promise;
  }

  const u = new Model(userToCreate);
  u.save((error, createdUser) => {
    if (error) {
      logger.log(`Unable to create user, error: ${error} , user: ${createdUser}`);
      deferred.reject();
      return;
    }

    deferred.resolve(createdUser);
  });

  return deferred.promise;
}

function setupDefaultUser() {
  Model.find((err, foundUsers) => {
    if (!foundUsers || foundUsers.length === 0) {
      createUser({
        userName: 'admin',
        password: 'emil',
        userRole: 'admin',
      });

      return true;
    }

    return false;
  });
}

exports.findUserByName = userName => {
  logger.log(`Trying to find user with userName: ${userName}`);

  const deferred = q.defer();

  if (!Model) {
    logger.log(`Unable to find user with user name: ${userName}, no model`);
    deferred.reject();
    return deferred.promise;
  }

  Model.findOne({ userName }, (error, foundUser) => {
    if (error || !foundUser) {
      logger.log(`Could not find user, error: ${error}, userName: ${userName}`);
      deferred.reject();
      return;
    }

    deferred.resolve(foundUser);
  });

  return deferred.promise;
};

exports.createUser = createUser;

exports.deleteUser = userName => {
  console.log(`delete called for user: ${userName}`);

  const deferred = q.defer();

  deferred.reject();

  return deferred.promise;
};

mongoMain.connectionPromise.then(() => {
  Model = user.getModel();
  setupDefaultUser();
});
