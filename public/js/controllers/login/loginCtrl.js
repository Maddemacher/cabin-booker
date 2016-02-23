function LoginCtrl($scope, $http, authenticationService, sessionService){
	$scope.credentials = {
		userName: '',
		password: ''
	};

	$scope.login = function(credentials){
		$http
		.post('/api/login', credentials)
		.then(function (response) {
			if(response.data.success)
			{
				return sessionService.create(response.data.session);
			}
			else
			{
				$scope.failed = true;
			};
		});
	};
};
