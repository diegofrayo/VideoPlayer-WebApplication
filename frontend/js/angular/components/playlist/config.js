var playlistModule = angular.module("playlistModule", []);

/*------Services------*/
playlistModule.value('key', 'value');
playlistModule.factory('$httpService', httpService);

/*------Controllers------*/
playlistModule.controller("PlaylistController", PlaylistController);

/*------Directives------*/
playlistModule.directive('playlist', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			template: '@'
		},
		controller: 'PlaylistController',
		templateUrl: function(element, attrs) {
			return 'frontend/js/angular/components/playlist/templates/template-' + attrs.template + '.html';
		}
	}
});