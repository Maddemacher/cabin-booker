var userRepo = require(__dirname + '/../data/userrepo.js');
var sessionRepo = require(__dirname + '/../data/sessionrepo.js');

var uuid = require('node-uuid');
var moment = require('moment');

exports.DeleteSessionById = function(sessionId){
	return sessionRepo.DeleteSessionById(sessionId);
}

exports.ValidateSession = function(sessionId){
	return sessionRepo.FindSessionById(sessionId)
										.then(function(session){
														console.log("found");
														if(!session){
															console.log("unable to locate session");
															throw new Error("unable to locate session");
														}

														console.log("is after " + moment().isAfter(session.expirationDate));

														if(moment().isAfter(session.expirationDate)){
															console.log("remove expired session");
															sessionRepo.RemoveSessionById(data.id);
															throw new Error("session expired");
														}

														return session;
											});
}

exports.Authenticate = function(data, onLoginSuccess, onLoginFailed) {
		userRepo.FindUserByName(data.userName, function(user){
			if(user.password === data.password){ //ska anv'nda hashes ist'llet egentligen

				sessionRepo.CreateSession(user).then(function(session) {
					console.log("created" +session);
					if(session)
						onLoginSuccess(session);
					else
						onLoginFailed();
				});
			}
			else{
				onLoginFailed();
			}
	}, onLoginFailed);
};
