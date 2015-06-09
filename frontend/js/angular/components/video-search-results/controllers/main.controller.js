function VideoSearchsResultsController($scope, $httpService, $rootScope) {

	$scope.addVideoToPlaylist = function(index) {

		var videoItemSelected = $rootScope.resultsList.items[index];

		var successFunction = function(data, status, headers, config) {

			//Video item para agregar a la lista de reproduccion
			var videoItem = createItemVideo(
				data.id,
				videoItemSelected.complete_title,
				videoItemSelected.channel_id,
				videoItemSelected.channel_name,
				videoItemSelected.duration,
				videoItemSelected.picture_url,
				videoItemSelected.youtube_video_id
			);

			$rootScope.playlist.items.push(videoItem);
			console.log('addVideoToPlaylist');
		};

		var errorFunction = function(data, status, headers, config) {

			$('.ResponseMessageSearch').html('Can not to add the video to the playlist');
		};

		var data = {
			'action': 'saveVideo',
			'id': 0,
			'title': videoItemSelected.complete_title,
			'duration': videoItemSelected.duration,
			'channel_name': videoItemSelected.channel_name,
			'playlist_id': 1,
			'picture_url': videoItemSelected.picture_url,
			'youtube_video_id': videoItemSelected.youtube_video_id
		};

		$httpService.post('saveVideo', data, successFunction, errorFunction);
	}
}