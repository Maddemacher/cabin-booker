function BookCabinCtrl($scope, $uibModalInstance, cabin, cabinService){
	$scope.cabin = cabin;
	$scope.today = new Date();
	$scope.startDate = $scope.today;
	$scope.endDate = $scope.startDate;


	$scope.book = function () {
		if(cabinService.BookCabin({
			Renter: {
				socialSecurityNumber: $scope.socialSecurityNumber,
				name: $scope.name,
				streetAddress = $scope.streetAddress,
				phoneNr: $scope.phoneNr,
				email: $scope.email,
			}
			startDate: $scope.startDate,
			sndDate: $scope.endDate;
		})){
			$uibModalInstance.close();	
		}
		else{

		}
		
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};