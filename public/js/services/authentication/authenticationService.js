app.service('authenticationService', function(sessionService){
	function IsAuthenticated(){
		return sessionService.hasSession();
	}

	return {
		IsAuthenticated: IsAuthenticated,
		IsAuthorized: function(authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (IsAuthenticated() && authorizedRoles.indexOf(sessionService.getSessionRole()) !== -1);
		}
	}
});
