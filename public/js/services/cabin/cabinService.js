app.service('cabinService', function($http){

	var currentCabins = [];

	var bookCabin = function(bookingData) {
		return $http.post('/api/book', bookingData).then(function(successData) {
			return true;
		},
		function(erroData){
			return false;
		});
	};

	var UnbookCabin = function() {

	};

	var CreateCabin = function() {

	};

	var DeleteCabin = function() {

	};

	var EditCabin = function() {

	};

	//request cabins
	$http.get('/api/cabins')
	.then(
		function(response){
			currentCabins.length = 0;
			response.data.forEach(function(entry) { currentCabins.push(entry);});
		},
		function(error)
		{
			console.log(error);
		});


	return {
		cabins: currentCabins,
		bookCabin: bookCabin
	};
});
