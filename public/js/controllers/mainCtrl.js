var app = angular.module('cabinBooker', ['ui.router', 'ui.bootstrap', 'mwl.calendar']);

app.run(function($state, $rootScope, $location, authenticationService, AUTH_EVENTS){
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(e){
    	e.preventDefault();
    	$state.go('overview');
    });

    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(e){
    	e.preventDefault();
    	$state.go('login');
    })

    $rootScope.$on('$stateChangeStart', function(e, toState  , toParams, fromState, fromParams) {

        var isLogin = toState.name === "login";
        if(isLogin){
           return; // no need to redirect 
        }

        // now, redirect only not authenticated
        if(authenticationService.IsAuthenticated() === false) {
            e.preventDefault(); // stop current execution
            $state.go('login'); // go to login
        }
    });
});

app.controller('MainCtrl', function($scope, $http){
});