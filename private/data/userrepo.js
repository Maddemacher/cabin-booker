var mongoMain = require(__dirname + '/mongomain.js');

var userModel = undefined;

function SetupUserRepo()
{
	var userSchema = mongoMain.handle.Schema({
		Username : String,
		Password: String,
		UserRole: String
	});

	userModel = mongoMain.handle.model('users', userSchema);
};

function SetupDefaultUser(){
	userModel.find(function(err, user){
		if(!user || user.length == 0){
			CreateUser({
				Username: 'admin',
				Password: 'emil',
				UserRole: 'Admin'
			});
		}
	})
}

exports.FindUserByName = function(name, onComplete, onError)
{
	if(!userModel)
	{
		console.log("Unable to retreive user, no model");
		return;	
	} 

	userModel.find({ 'Username': name }, function(err, user)
	{
		if(err)
		{	
			console.log("Unable to retreive user");
			return onError();
		}

		return onComplete(user[0]);
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
