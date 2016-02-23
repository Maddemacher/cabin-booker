var baseUrl = $("base").first().attr("href");

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/login");

	 // Now set up the states
	 $stateProvider
	 .state('login', {
	 	url: "/login",
	 	templateUrl: baseUrl + "/public/partials/authentication/login.html",
	 	controller: LoginCtrl
	 })

	 .state('overview', {
	 	url: "/overview",
	 	templateUrl: baseUrl + "/public/partials/overview.html",
	 })

	 .state('cabins', {
	 	url: "/cabins",
	 	templateUrl: baseUrl + "/public/partials/cabin/cabins.html",
	 	controller: CabinsCtrl,
	 })

	 .state('notbooked', {
	 	url: "/notbooked",
	 	templateUrl: baseUrl + "/public/partials/overview.html",
	 })
	 
	 .state('booked', {
	 	url: "/booked",
	 	templateUrl: baseUrl + "/public/partials/overview.html",
	 	controller: function($scope) {
	 		$scope.things = ["A", "Set", "Of", "Things"];
	 	}
	 });
	});
