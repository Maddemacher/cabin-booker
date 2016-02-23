app.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});

app.constant('USER_ROLES', {
	all: '*',
	admin: 'admin',
	editor: 'editor',
	guest: 'guest'
});

app.service('sessionService', function($rootScope, AUTH_EVENTS){
	this.create = function (sessionId, userId, userRole) {
		this.id = sessionId;
		this.userId = userId;
		this.userRole = userRole;

		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	};
	this.destroy = function () {
		this.id = null;
		this.userId = null;
		this.userRole = null;

		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	};
});

app.service('authenticationService', function(sessionService){ 
	return {
		IsAuthenticated: function() { return !!sessionService.userId; },
		IsAuthorized: function(authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
		}
	}
});