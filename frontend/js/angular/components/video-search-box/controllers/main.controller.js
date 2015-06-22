function VideoSearchsBoxController($scope, $http, $rootScope, $q) {

	$scope.inputSearch = "";
	$scope.resultsList = new SongsListClass();
	$scope.youtubeCheckbox = false;
	$scope.localStorageCheckbox = false;

	$scope.searchVideos = function() {
		$scope.resultsList = new SongsListClass();
		if ($scope.youtubeCheckbox) {
			var searcherYoutube = SearcherFactory.createSearcher('Youtube');
			searcherYoutube.search($scope.inputSearch, $scope.resultsList, $http, $q);
		} else if ($scope.localStorageCheckbox) {
			var localStorage = SearcherFactory.createSearcher('LocalStorage');
			localStorage.search($scope.resultsList, $http, $q);
		}
		$rootScope.$broadcast('showSearchResults', $scope.resultsList);
	};
}