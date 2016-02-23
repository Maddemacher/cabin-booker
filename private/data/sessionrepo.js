var mongoMain = require(__dirname + '/mongomain.js');
var uuid = require('node-uuid');
var Q = require('q')
var moment = require('moment');

var sessionModel = undefined;

function SetupSessionRepo(){
	var sessionSchema = mongoMain.handle.Schema(
    {
      id : String,
      expirationDate : String,
      userRole : String
  	});
	sessionModel = mongoMain.handle.model('sessions', sessionSchema);
}

function FindSessionById(id)
{
	return sessionModel.findOne({ 'id': id }).exec();
}

function GetExpirationDate(){
  return moment().add(1, 'hour').toISOString();
}

function CreateSession(user){
  var deferred = Q.defer();

  new sessionModel({id: user._id, expirationDate: GetExpirationDate(), userRole: user.userRole})
    .save(function(error, session)
      {
        if(error || !session){
            deferred.reject();
          }
          else{
            deferred.resolve(session);
          }
      });

  return deferred.promise;
}

function DeleteSessionById(sessionId){
	return sessionModel.find({ 'id': sessionId }).remove().exec();
}

exports.CreateSession = CreateSession;
exports.FindSessionById = FindSessionById;
exports.DeleteSessionById = DeleteSessionById;

mongoMain.registerConnectionHandlers(
	function(){
		SetupSessionRepo();
	},
  function(){});
