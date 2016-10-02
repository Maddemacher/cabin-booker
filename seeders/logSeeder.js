const fs = require('fs');

fs.appendFile('/var/log/cabinbooker.log', `Seeder | INFO | ${new Date()} | SEEDER MESSAGE\n\r`);
