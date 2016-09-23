
var argv = require('minimist')(process.argv.slice(2));

console.log(argv);

exports.getArg = function(key) {
    return argv[key];
};
