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
};

app.directive('menu', function(){
	return {
		templateUrl: 'public/partials/menu/menu.html',
		restrict: 'E',
		controller: MenuCtrl
	};
});