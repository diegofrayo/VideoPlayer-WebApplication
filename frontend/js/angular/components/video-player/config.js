var videoPlayerModule = angular.module("videoPlayerModule", []);

/*------Controllers------*/
videoPlayerModule.controller("VideoPlayerController", VideoPlayerController);

/*------Directives------*/
videoPlayerModule.directive('videoPlayer', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			template: '@'
		},
		controller: 'VideoPlayerController',
		templateUrl: function(element, attrs) {
			return 'frontend/js/angular/components/video-player/templates/template-' + attrs.template + '.html';
		}
	}
});