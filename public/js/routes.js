
app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/login");

	 // Now set up the states
	 $stateProvider
	 .state('login', {
	 	url: "/login",
	 	templateUrl: "/partials/authentication/login.html",
	 	controller: 'LoginCtrl'
	 })

	 .state('overview', {
	 	url: "/overview",
	 	templateUrl: "/partials/overview.html",
	 })

	 .state('cabins', {
	 	url: "/cabins",
	 	templateUrl: "/partials/cabin/cabins.html",
	 	controller: CabinsCtrl,
	 })

	 .state('notbooked', {
	 	url: "/notbooked",
	 	templateUrl: "/partials/overview.html",
	 })

	 .state('booked', {
	 	url: "/booked",
	 	templateUrl: "/partials/overview.html",
	 	controller: function($scope) {
	 		$scope.things = ["A", "Set", "Of", "Things"];
	 	}
	 });
	});
