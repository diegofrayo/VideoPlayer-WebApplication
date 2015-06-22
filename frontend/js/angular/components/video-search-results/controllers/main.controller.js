function VideoSearchsResultsController($scope, $httpService, $rootScope) {

	$scope.resultsList = new Array();

	$rootScope.$on('showSearchResults', function(event, data) {
		$scope.resultsList = data;
	});

	$scope.addVideoToPlaylist = function(index) {

		var songSelected = $scope.resultsList.getSong(index);

		var successFunction = function(data, status, headers, config) {
			$rootScope.$broadcast('addVideoToPlaylist', songSelected);
		};

		var errorFunction = function(data, status, headers, config) {
			$('.ResponseMessageSearch').html('Can not to add the video to the playlist');
		};

		var data = {
			'action': 'saveVideo',
			'source_id': songSelected.source_id,
			'title': songSelected.title,
			'duration': songSelected.duration,
			'channel_name': songSelected.channel_name,
			'picture_url': songSelected.picture_url,
			'id': 0
		};

		$httpService.post('insert', data, successFunction, errorFunction);
	}
}