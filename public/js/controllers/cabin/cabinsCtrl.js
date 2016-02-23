function CabinsCtrl($scope, $http, cabinService){
	
	$scope.cabins = cabinService.cabins;
	$scope.showingDetails = false;


	$scope.showDetails = function(cabin){
		$scope.showingDetails = !$scope.cabinDetails || $scope.cabinDetails._id != cabin._id;
		
		if($scope.cabinDetails)
			$scope.cabinDetails.selected = false;

		if($scope.showingDetails)
		{
			$scope.cabinDetails = cabin;
			$scope.cabinDetails.selected = true;
		}
		else
		{
			$scope.cabinDetails.selected = false;
			$scope.cabinDetails = undefined;
		}
	}
}