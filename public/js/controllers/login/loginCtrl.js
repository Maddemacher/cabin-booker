function LoginCtrl($scope, $http, authenticationService, sessionService){
	$scope.credential = {
		userName: '',
		password: ''
	};

	$scope.login = function(credentials){
		$http
		.post('/cabinbooker/api/login', credentials)
		.then(function (response) {
			if(response.data.success)
			{
				sessionService.create(response.data.token.id, response.data.token.user.id,
					response.data.token.user.role);

				return response.data.user;
			}
			else
			{
				$scope.failed = true;
			};
		});
	};
};
