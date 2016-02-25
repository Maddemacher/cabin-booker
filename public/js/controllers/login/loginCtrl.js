app.controller('LoginCtrl', ['$scope', '$http', 'sessionService', function ($scope, $http, sessionService){
	$scope.credentials = {
		userName: '',
		password: ''
	};

	$scope.login = function(credentials){
		return $http.post('/api/login', credentials)
								.then(function (response) {
									if(response.data.success) {
										return sessionService.create(response.data.session);
									}
									else {
										$scope.loginFailed = true;
									};
								});
	};
}]);
