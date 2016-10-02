
const argv = require('minimist')(process.argv.slice(2));

exports.getArg = key => argv[key];
