'use strict';

var logger = function() {
	  return {
		    log: function(msg) {
            if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
                console.log(msg);
            }
	      }
	  };
}();

module.exports = logger;
