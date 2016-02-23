var userRepo = require(__dirname + '/../data/userrepo.js');
var uuid = require('node-uuid');

exports.Authenticate = function(data, onLoginSuccess, onLoginFailed) {
	userRepo.FindUserByName(data.userName, function(user){
		console.log('user found, pass: ' + user.Password + " data pass: " + data.password);
		console.log(user);
		if(user.Password === data.password){ //ska anv'nda hashes ist'llet egentligen
			onLoginSuccess({
				id: uuid.v1(),
				user: {
					id: uuid.v1(),
					role: 'admin'
				}
			});
		}
		else{
			onLoginFailed();
		}
	}, onLoginFailed);
};