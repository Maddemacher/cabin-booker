var mongoMain = require(__dirname + '/mongomain.js');

var userModel = undefined;

function SetupUserRepo()
{
	var userSchema = mongoMain.handle.Schema({
		userName : String,
		password: String,
		userRole: String
	});

	userModel = mongoMain.handle.model('users', userSchema);
};

function SetupDefaultUser(){
	userModel.find(function(err, user){
		if(!user || user.length == 0){
			CreateUser({
				userName: 'admin',
				password: 'emil',
				userRole: 'admin'
			});
		}
	})
}

exports.FindUserByName = function(userName, onComplete, onError)
{
	if(!userModel)
	{
		console.log("Unable to retreive user, no model");
		return;
	}

	userModel.findOne({ 'userName': userName }, function(err, user)
	{
		if(err || !user)
		{
			console.log("Unable to retreive user");
			return onError();
		}

		return onComplete(user);
	});
};

var CreateUser = function(user)
{
	console.log("create user");

	if(!userModel)
	{
		return console.log("Unable to create user, no model");
	}

	var user = new userModel(user);
	user.save(function(error, user)
	{
		if(error)
		{
			return console.log("Unable to create user")
		}

		return user;
	});
};

exports.CreateUser = CreateUser;

exports.DeleteUser = function(userName)
{
	console.log("delete called for: " + userName);
}

mongoMain.registerConnectionHandlers(
	function(){
		SetupUserRepo();
		SetupDefaultUser();
	}, function(){

	});
