var videoSearchBoxModule = angular.module("videoSearchBoxModule", []);

/*------Controllers------*/
videoSearchBoxModule.controller("VideoSearchsBoxController", VideoSearchsBoxController);

/*------Services------*/
videoSearchBoxModule.value('key', 'value');
videoSearchBoxModule.factory('$httpService', httpService);

/*------Directives------*/
videoSearchBoxModule.directive('videoSearchBox', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			template: '@',
		},
		controller: 'VideoSearchsBoxController',
		templateUrl: function(element, attrs) {
			return 'frontend/js/angular/components/video-search-box/templates/template-' + attrs.template +'.html';
		}
	}
});