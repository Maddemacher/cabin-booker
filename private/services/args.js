
var argv = require('minimist')(process.argv.slice(2));

exports.getArg = function(key) {
    return argv[key];
};
