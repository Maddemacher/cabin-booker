function CabinCardCtrl($scope){
	$scope.$watch('cabin.selected', function(newValue, oldValue) {
		$scope.class = newValue ? 'selected' : '';
	});
};

app.directive('cabinCard', function(){
	return {
		controller: CabinCardCtrl,
		templateUrl: 'public/partials/cabin/cabinCard.html',
		restrict: 'E'
	};
});