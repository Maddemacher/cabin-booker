function MenuCtrl($scope, $rootScope, sessionService, AUTH_EVENTS){

	$rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
		$scope.showMenu = true;
	});

	$rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
		$scope.showMenu = false;
	})

	$scope.logout = function(){
		sessionService.destroy();
	}

	$rootScope.$broadcast(AUTH_EVENTS.sessionValidationRequested);
};

app.directive('menu', function(){
	return {
		templateUrl: 'partials/menu/menu.html',
		restrict: 'E',
		controller: MenuCtrl
	};
});
