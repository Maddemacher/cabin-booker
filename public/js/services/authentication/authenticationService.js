app.service('authenticationService', function(sessionService){
	return {
		IsAuthenticated: function() { return sessionService.hasSession(); },
		IsAuthorized: function(authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (authService.isAuthenticated() && authorizedRoles.indexOf(sessionService.getSessionRole()) !== -1);
		}
	}
});
