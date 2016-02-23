app.service('sessionService', function($rootScope, $http, $cookies, AUTH_EVENTS){
  var cookieKey = "cabinBookerSession";

	function create(session) {
    $cookies.putObject(cookieKey, session, {expires : moment().add(1, 'year').toDate()});
		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

    return $cookies.getObject(cookieKey);
	};

	function destroy() {
    $http.delete('/api/session/' + $cookies.getObject(cookieKey).id);

    $cookies.remove(cookieKey);
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	};

  function hasSession(){
    var session = $cookies.getObject(cookieKey);
    if(session)
      return true;
		$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
  }

  $rootScope.$on(AUTH_EVENTS.sessionValidationRequested, function(){
    $http.get('/api/session/' + $cookies.getObject(cookieKey).id)
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
		hasSession: function () { return !!hasSession(); },
    getSessionRole: function () { return $cookies.getObject(cookieKey).userRole; }
	};
});
