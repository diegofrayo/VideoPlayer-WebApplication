var mainApplicationModule = angular.module("mainApplicationModule", ['ngRoute']);

/*------Routes-----*/
mainApplicationModule.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html'
	}).when('/my-profile', {
		templateUrl: 'views/my-profile.html'
	}).when('/my-lists', {
		templateUrl: 'views/my-lists.html'
	}).otherwise({
		templateUrl: 'views/home.html'
	});
});


/*------Services------*/
mainApplicationModule.value('key', 'value');
mainApplicationModule.factory('$playlistService', playlistService);
mainApplicationModule.factory('$httpService', httpService);


/*------Controllers------*/
mainApplicationModule.controller("PlaylistController", PlaylistController);
mainApplicationModule.controller("SearchsController", SearchsController);


/*------Filters------*/
mainApplicationModule.filter("capitalize", function(){
	return function(text) {
		if(text !== null){

			words = text.split(' ');
			response = '';

			for (var i = 0; i < words.length; i++) {

				word = words[i];

				//if(!(word.length <= 2 && word === word.toUpperCase())){
					word = word.toLowerCase();
					word = word.substring(0,1).toUpperCase()+word.substring(1);
				//}

				response += word + " ";
			}

			return response.trim();
		}
	};
});


/*------Directives------*/
mainApplicationModule.directive('videoItem', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			item: '=videoItem',
			index: '@index',
			playVideo: '&playVideo',
			removeVideoFromPlaylist: '&removeVideo',
		},
		templateUrl: 'js/angular/main-application.module/templates/video-item.html'
	}
});