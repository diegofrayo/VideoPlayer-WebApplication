var mainApplicationModule = angular.module("mainApplicationModule", ['ngRoute', 'videoSearchBoxModule', 'videoSearchResultsModule', 'playlistModule']);

/*------Routes-----*/
mainApplicationModule.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'frontend/views/home.html'
		}).when('/my-profile', {
			templateUrl: 'frontend/views/my-profile.html'
		}).when('/my-lists', {
			templateUrl: 'frontend/views/my-lists.html'
		}).otherwise({
			templateUrl: 'frontend/views/home.html'
		});
});