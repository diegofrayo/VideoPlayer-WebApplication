var app = angular.module("VideoPlayerApp", ['ngRoute']);

app.config(function ($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: "views/home.html",
		controller: 'SearchsController'
	})
	.when('/profile',{
		templateUrl: 'views/profile.html',
		controller: ''
	})
	.when('/my-lists',{
		templateUrl: 'views/my-lists.html',
		controller: ''
	})
});

app.factory('factoryPlaylist', function(){
	return {items: [], sizePlaylist: 0};
});

app.controller("SearchsController", searchsController);
app.controller("PlaylistController", playlistController);