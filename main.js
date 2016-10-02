require('strict-mode')(() => {
  const bodyParser = require('body-parser');

  const express = require('express');

  const app = express();

  const logger = require(`${__dirname}/private/services/logger.js`);

  const config = require(`${__dirname}/private/services/configLoader.js`);

  // Repositories
  const mongoMain = require(`${__dirname}/private/data/mongomain.js`);

  mongoMain.init(config);

  const cabinRepo = require(`${__dirname}/private/data/cabinrepo.js`);
  // End Repositories

  const authentication = require(`${__dirname}/private/authentication/authentication.js`);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(express.static('web/public'));
  app.use('/bower_components', express.static(`${__dirname}/bower_components`));

  app.get('/', (request, response) => {
    response.sendfile('index.html');
  });

  app.get('/api/cabins', (request, response) => {
    cabinRepo.all().then(cabins => {
      response.json(cabins);
    });
  });

  app.post('/api/cabins', (request, response) => {
    logger.log('post called on cabins');
    logger.log(request.body);

    if (request.body) {
      cabinRepo.createCabin(request.body)
        .then(() => {
          logger.log('cabin successfully created');

          response.send();
        })
        .catch(error => {
          logger.log(`create cabin failed with error: ${error}`);

          response.send();
        });
    }
  });

  app.delete('/api/session/:id', (request, response) => {
    logger.log('trying to delete session for user ' + request.params.id);

    authentication.DeleteSessionById(request.params.id).then(() => {
      response.send();
    });
  });

  app.get('/api/session/:id', (request, response) => {
    authentication.ValidateSession(request.params.id)
      .then(session => {
        if (session) {
          logger.log('session validated');

          response.json({ valid: true });
          return;
        }

        logger.log('session not validated');
        response.json({ valid: false });
      })
      .catch(() => {
        response.json({ valid: false });
      });
  });

  app.post('/api/login', (request, response) => {
    logger.log(`login requested for ${request.body.useName} with password ${request.body.password}`);

    function loginSuccess(session) {
      logger.log('login succeded');

      response.json({ success: true, session });
    }

    function loginFailed() {
      logger.log(`login failed for user with name ${request.body.userName}`);

      response.json({ success: false, session: null });
    }

    authentication.Authenticate(request.body).then(loginSuccess).catch(loginFailed);
  });

  const port = process.env.PORT || 3000;
  logger.log(`Server listening on port ${port}`);

  app.listen(port);
});
