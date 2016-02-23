app.service('sessionService', function($rootScope, $http, $cookies, AUTH_EVENTS){
  var cookieKey = "cabinBookerSession";
  var currentSession = $cookies.getObject(cookieKey);

	var create = function (session) {
    console.log("creating session");
		currentSession = session;
    $cookies.putObject(cookieKey, session, {expires : moment().add(1, 'year').toDate()});
		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

    return currentSession;
	};

	var destroy = function () {
    console.log("destroying session");
    $http.delete('/api/session/' + currentSession.id);

		currentSession = null;
    $cookies.remove(cookieKey);
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	};

  $rootScope.$on(AUTH_EVENTS.sessionValidationRequested, function(){
    $http.get('/api/session/' + currentSession.id)
         .then(function(successData) {
            if(successData.data.valid)
            {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }
            else
            {
              destroy();
            }
          },
          function(erroData){
              destroy();
          });
  });

	return {
		create: create,
		destroy: destroy,
		hasSession: function () { return !!currentSession; },
    getSessionRole: function () { return currentSession.userRole; }
	};
});
