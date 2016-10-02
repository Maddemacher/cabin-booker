const fs = require('fs');

exports.log = (msg, severity = "INFO") => {
  let message = `Cabin-Booker | ${new Date()} | ${severity} | ${msg}\n\r'`;

  console.log(message);

  fs.appendFile('/var/log/cabinbooker.log', message, error => {
    if (error)
      console.log(`Unable to write to logfile error: ${error}`);
  });
};
