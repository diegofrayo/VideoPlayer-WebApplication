function PlaylistController($scope, $rootScope, $httpService) {

	//Variables playlist
	$scope.playlist = {
		items: []
	};
	$scope.indexCurrentReproduction = -1;
	$scope.isPlayingThePlaylist = false;
	$scope.sizePlaylist = $scope.playlist.items.length;

	$rootScope.$on('addVideoToPlaylist', function(event, data) {
		$scope.playlist.items.push(data);
		console.log('PlaylistController receive addVideoToPlaylist');
	});

	$rootScope.$on('executeFunctionFromVideoPlayer', function(event, data) {
		switch (data) {
			case 'prevVideo':
				$scope.prevVideo();
				break;

			case 'nextVideo':
				$scope.nextVideo();
				break;

			case 'cleanPlaylist':
				$scope.cleanPlaylist();
				break;
		}
		console.log('PlaylistController receive executeFunctionFromVideoPlayer');
	});

	$scope.playVideo = function(index) {

		var selectedVideo = $scope.playlist.items[index];
		$scope.indexCurrentReproduction = index;
		$scope.isPlayingThePlaylist = true;

		$scope.playVideoOnJWPLayer(selectedVideo.youtube_video_id);
		removeClassActiveItem();
		addClassActiveItem(index);
	};

	$scope.stopVideoPlayer = function() {

		jwplayer('jwPlayer').stop();
		jwplayer('jwPlayer').setup({
			file: '',
			width: "100%",
			height: "100%"
		});

		jwplayer('jwPlayer').onComplete(function() {
			$scope.removeVideoFromPlaylist($scope.indexCurrentReproduction);
		});
	};

	$scope.removeVideoFromPlaylist = function(index) {

		var newList = {
			items: []
		};
		var playList = $scope.playlist.items;
		var sizePlaylist = $scope.sizePlaylist;
		var videoItemSelected = $scope.playlist.items[index];

		var successFunction = function(data, status, headers, config) {

			for (var i = 0; i < sizePlaylist; i++) {

				itemLista = playList[i];

				if (i != index) {

					newList.items.push(itemLista);
				}
			}

			$scope.playlist = newList;
			$scope.sizePlaylist = $scope.playlist.items.length;
			console.log('PlaylistController send updateSizePlaylist');
			$rootScope.$broadcast('updateSizePlaylist', $scope.sizePlaylist);

			//Si la lista se esta reproduciendo
			if ($scope.isPlayingThePlaylist) {

				//Si se eliminó el item que se estaba reproduciendo
				if ($scope.indexCurrentReproduction == index) {

					switch ($scope.sizePlaylist) {

						//Si la lista quedó vacia
						case 0:

							$scope.isPlayingThePlaylist = false;
							$scope.indexCurrentReproduction = -1;
							$scope.stopVideoPlayer();
							break;

							//Si solo quedó un elemento
						case 1:

							$scope.indexCurrentReproduction = 0;
							$scope.playVideoOnJWPLayer($scope.playlist.items[0].id);
							removeClassActiveItem();
							addClassActiveItem(0);
							break;

							//Si hay 2 o mas elementos
						default:

							$scope.indexCurrentReproduction--;
							$scope.nextVideo();
							break;
					}

					//Si se eliminó un item que no se estaba reproduciendo
				} else {

					if ($scope.indexCurrentReproduction > index) {

						$scope.indexCurrentReproduction--;
					}
				}
			}

			// console.log('Success - Delete Video To The Playlist');
		}

		var errorFunction = function() {

			$('.ResponseMessageSearch').html('The video can not be deleted from the playlist');
			// console.log(response);
			// console.log('Error - Delete Video To The Playlist');
		}

		var data = {
			'videoId': videoItemSelected.id
		};

		$httpService.post('deleteVideo', data, successFunction, errorFunction);
	};


	$scope.getCurrentPlaylistBackend = function() {

		var successFunction = function(data, status, headers, config) {

			var videoItem = null;

			for (var i = 0; i < data.length; i++) {

				videoItem = data[i];

				videoItemNew = createItemVideo(
					videoItem.id,
					videoItem.title,
					'-',
					videoItem.channel_name,
					videoItem.duration,
					videoItem.picture_url,
					videoItem.youtube_video_id);

				$scope.playlist.items.push(videoItemNew);
			}

			$scope.sizePlaylist = $scope.playlist.items.length;
			console.log('PlaylistController send updateSizePlaylist');
			$rootScope.$broadcast('updateSizePlaylist', $scope.sizePlaylist);

			// console.log(JSON.stringify(response));
			// console.log('Success - Get playlist to the backend');
		}

		var errorFunction = function(response) {

			//$('.ResponseMessageSearch').html(response);
			// console.log('Error - Get playlist to the backend');
		};

		$httpService.get('/backend/index.php/getCurrentPlaylist', successFunction, errorFunction)
	};

	$scope.prevVideo = function() {

		var sizePlaylist = $scope.sizePlaylist;
		var currentIndex = $scope.indexCurrentReproduction;

		if (sizePlaylist > 1 && $scope.isPlayingThePlaylist) {

			removeClassActiveItem();

			if (currentIndex == 0) {

				currentIndex = sizePlaylist - 1;
			} else {

				currentIndex = currentIndex - 1;
			}

			$scope.indexCurrentReproduction = currentIndex;

			var urlVideo = $scope.playlist.items[currentIndex].youtube_video_id;
			$scope.playVideoOnJWPLayer(urlVideo);
			addClassActiveItem(currentIndex);
		}
	};

	$scope.nextVideo = function() {

		var sizePlaylist = $scope.playlist.items.length;
		var currentIndex = $scope.indexCurrentReproduction;

		if (sizePlaylist > 1 && $scope.isPlayingThePlaylist) {

			removeClassActiveItem();

			if (currentIndex == sizePlaylist - 1) {

				currentIndex = 0;
			} else {

				currentIndex = currentIndex + 1;
			}

			var urlVideo = $scope.playlist.items[currentIndex].youtube_video_id;
			$scope.indexCurrentReproduction = currentIndex;
			$scope.playVideoOnJWPLayer(urlVideo);
			addClassActiveItem($scope.indexCurrentReproduction);
		}
	};

	$scope.cleanPlaylist = function() {

		if ($scope.sizePlaylist > 0) {

			if (confirm("Are you sure you want to delete all items of the playlist?")) {

				var successFunction = function(data, status, headers, config) {

					$scope.playlist = {
						items: []
					};
					$scope.indexCurrentReproduction = -1;
					$scope.isPlayingThePlaylist = false;
					$scope.stopVideoPlayer();
					$scope.sizePlaylist = $scope.playlist.items.length;

					console.log('PlaylistController send updateSizePlaylist');
					$rootScope.$broadcast('updateSizePlaylist', $scope.sizePlaylist);

					// console.log('Success - Clean playlist in backend');
				}

				var errorFunction = function() {

					//console.log('Error - Clean playlist in backend');
				}

				$httpService.post('cleanPlaylist', {}, successFunction, errorFunction);
			}
		}
	};

	$scope.playVideoOnJWPLayer = function(idVideo) {

		jwplayer('jwPlayer').stop();
		var urlVideo = "http://www.youtube.com/watch?v=" + idVideo;

		//Si la cadena es vacia no carga ningun video
		if (idVideo === '') {

			urlVideo = '';
		}

		jwplayer('jwPlayer').setup({
			file: urlVideo,
			width: "100%",
			height: "100%"
		});

		//Esto es para que no se reproduzca al inicio el video por defecto
		if (idVideo !== '') {

			jwplayer('jwPlayer').play();
		}

		jwplayer('jwPlayer').onComplete(function() {

			$scope.removeVideoFromPlaylist($scope.indexCurrentReproduction);
		});
	};

	//Metodos
	$scope.playVideoOnJWPLayer('');
	$scope.getCurrentPlaylistBackend();
}