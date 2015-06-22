var videoSearchResultsModule = angular.module("videoSearchResultsModule", []);

/*------Services------*/
videoSearchResultsModule.value('key', 'value');
videoSearchResultsModule.factory('$httpService', httpService);

/*------Controllers------*/
videoSearchResultsModule.controller("VideoSearchsResultsController", VideoSearchsResultsController);

/*------Filters------*/
videoSearchResultsModule.filter("capitalize", function() {
	return function(text) {
		if (text !== null) {

			words = text.split(' ');
			response = '';

			for (var i = 0; i < words.length; i++) {
				word = words[i];
				word = word.toLowerCase();
				word = word.substring(0, 1).toUpperCase() + word.substring(1);
				response += word + " ";
			}

			return response.trim();
		}
	};
});

/*------Directives------*/
videoSearchResultsModule.directive('videoSearchResults', function() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			template: '@'
		},
		controller: 'VideoSearchsResultsController',
		templateUrl: function(element, attrs) {
			return 'frontend/js/angular/components/video-search-results/templates/template-' + attrs.template + '.html';
		}
	}
});