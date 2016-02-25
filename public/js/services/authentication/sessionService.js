app.service('sessionService', function($rootScope, $http, $cookies, AUTH_EVENTS){
  var cookieKey = "cabinBookerSession";

	function create(session) {
    $cookies.putObject(cookieKey, session, {expires : moment().add(1, 'year').toDate()});
		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
	};

	function destroy() {
    var currentSession =  $cookies.getObject(cookieKey);

    if(!currentSession)
      return;

    $http.delete('/api/session/' + currentSession.id);

    $cookies.remove(cookieKey);
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	};

  function hasSession(){
    var currentSession = $cookies.getObject(cookieKey);

    if(currentSession)
      return true;

		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
  }

  $rootScope.$on(AUTH_EVENTS.sessionValidationRequested, function(){
    var currentSession = $cookies.getObject(cookieKey);

    if(!currentSession)
      return;

    $http.get('/api/session/' + currentSession.id)
         .then(function(successData) {
            if(successData.data.valid) {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            }
            else {
              destroy();
            }
          },
          function(errorData){
              destroy();
          });
  });

	return {
		create: create,
		destroy: destroy,
		hasSession: function () { return !!hasSession(); },
    getSessionRole: function () { return $cookies.getObject(cookieKey).userRole; }
	};
});
