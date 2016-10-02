
const logger = require('./logger');

let env = process.env.NODE_ENV;

if (!env) {
  env = 'development';
}

logger.log('Node environment: ' + env);
logger.log('loading config.' + env + '.json');

module.exports = require(`${__dirname}/../config/config.${env}.json`);
