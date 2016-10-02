'use strict';
var dataInitializer = require('./lib/dataSeeder'),
    config = require(__dirname + '/private/config/config.develop.json'),
    db = require(__dirname + '/private/data/mongomain.js');

db.init(config.databaseConfig);

console.log('Initializing Data');
dataInitializer.initializeData(function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Data Initialized!')
    }
});
