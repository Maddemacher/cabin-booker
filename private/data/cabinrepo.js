var mongoMain = require(__dirname + '/mongomain.js');

var cabinModel = undefined;

function SetupCabinMethods()
{

};

function SetupCabinRepo()
{
	var cabinSchema = mongoMain.handle.Schema({
		Name : String,
		Code: String,
		Reservations: [{
			StartDate: Date,
			EndDate: Date,
			Name: String,
			PersNr: String,
			Street: String,
			Zip: String,
			City: String,
			Phone: String,
			Email: String,
			Reserves: [{
				PersNr: String,
				Name: String,
				Phone: String
			}]
		}],
		Prices: [{
			Type: String,
			StartWeek: Number,
			EndWeek: Number,
			Price: Number
		}]
	});

	SetupCabinMethods();

	cabinModel = mongoMain.handle.model('cabins', cabinSchema);
};


exports.Cabins = function(onComplete, onError)
{
	if(!cabinModel)
	{
		console.log("Unable to retreive cabins, no model");
		return;
	}

	cabinModel.find(function(err, cabins)
	{
		if(err)
		{
			console.log("Unable to retreive cabins");
			return onError();
		}

		return onComplete(cabins);
	});
};

exports.CreateCabin = function(cabin)
{
	console.log("create cabin");

	if(!cabinModel)
	{
		return console.log("Unable to create cabin, no model");
	}

	var c = new cabinModel(cabin);
	c.save(function(error, cabin)
	{
		if(error)
		{
			return console.log("Unable to create cabin")
		}

		return cabin;
	});
};

exports.DeleteCabin = function(cabinName)
{
	console.log("delete called for: " + cabinName);
}

mongoMain.registerConnectionHandlers(
	function(){
		SetupCabinRepo();
	},
	function(){

	});
