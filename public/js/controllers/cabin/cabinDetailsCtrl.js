function CabinDetailsCtrl($scope, $uibModal){

	$scope.calendarView = 'month';
	$scope.calendarDate = new Date();
	$scope.events = [];
	$scope.calendarTitle = "Bookings for Cabin"


	function ParseBookings(){

		if(!$scope.cabinDetails || !$scope.cabinDetails.Reservations)
			return;

		$scope.cabinDetails.Reservations.forEach(function(reservation){
			$scope.events.length = 0;

			$scope.events.push({
				title: reservation.MemberShipNumber,
				type: 'info',
				startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
				endsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate()
			});
		});
	};

	$scope.bookCabin = function(){

		var modalInstance = $uibModal.open({
			templateUrl: 'public/partials/cabin/bookCabin.html',
			controller: BookCabinCtrl,
			size: 'lg',
			resolve: {
				cabin: function () {
					return $scope.cabinDetails;
				}
			}
		});

		modalInstance.result.then(
			function (cabinDetails, startDate, endDate, memberShipNumber) {
			//on complete
		}, 
		function () {
			//on error
		});
	};

	ParseBookings();
};

app.directive('cabinDetails', function(){
	return {
		controller: CabinDetailsCtrl,
		templateUrl: 'public/partials/cabin/cabinDetails.html',
		restrict: 'E'
	};
});