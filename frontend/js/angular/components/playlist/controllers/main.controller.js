function PlaylistController($scope, $rootScope, $httpService) {

	//Variables playlist
	$rootScope.playlist = {
		items: []
	};
	$scope.indexCurrentReproduction = -1;
	$scope.isPlayingThePlaylist = false;
	$rootScope.sizePlaylist = $rootScope.playlist.items.length;

	$scope.playVideo = function(index) {

		var selectedVideo = $rootScope.playlist.items[index];
		$scope.indexCurrentReproduction = index;
		$scope.isPlayingThePlaylist = true;

		$scope.playVideoOnJWPLayer(selectedVideo.youtube_video_id);
		removeClassActiveItem();
		addClassActiveItem(index);
	};

	$scope.stopVideoPlayer = function() {

		jwplayer("VideoPlayer").stop();
		jwplayer("VideoPlayer").setup({
			file: '',
			width: "100%",
			height: "100%"
		});

		jwplayer("VideoPlayer").onComplete(function() {
			$scope.removeVideoFromPlaylist($scope.indexCurrentReproduction);
		});
	};

	$scope.removeVideoFromPlaylist = function(index) {

		var newList = {
			items: []
		};
		var playList = $rootScope.playlist.items;
		var sizePlaylist = $rootScope.sizePlaylist;
		var videoItemSelected = $rootScope.playlist.items[index];

		var successFunction = function(data, status, headers, config) {

			for (var i = 0; i < sizePlaylist; i++) {

				itemLista = playList[i];

				if (i != index) {

					newList.items.push(itemLista);
				}
			}

			$rootScope.playlist = newList;
			$rootScope.sizePlaylist = $rootScope.playlist.items.length;

			//Si la lista se esta reproduciendo
			if ($scope.isPlayingThePlaylist) {

				//Si se eliminó el item que se estaba reproduciendo
				if ($scope.indexCurrentReproduction == index) {

					switch ($rootScope.sizePlaylist) {

						//Si la lista quedó vacia
						case 0:

							$scope.isPlayingThePlaylist = false;
							$scope.indexCurrentReproduction = -1;
							$scope.stopVideoPlayer();
							break;

							//Si solo quedó un elemento
						case 1:

							$scope.indexCurrentReproduction = 0;
							$scope.playVideoOnJWPLayer($rootScope.playlist.items[0].id);
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

				$rootScope.playlist.items.push(videoItemNew);
			}

			$rootScope.sizePlaylist = $rootScope.playlist.items.length;

			// console.log(JSON.stringify(response));
			// console.log('Success - Get playlist to the backend');
		}

		var errorFunction = function(response) {

			//$('.ResponseMessageSearch').html(response);
			// console.log('Error - Get playlist to the backend');
		};

		$httpService.get('/backend/index.php/getCurrentPlaylist', successFunction, errorFunction)
	};

	$scope.playVideoOnJWPLayer = function(idVideo) {

		jwplayer("VideoPlayer").stop();
		var urlVideo = "http://www.youtube.com/watch?v=" + idVideo;

		//Si la cadena es vacia no carga ningun video
		if (idVideo === '') {

			urlVideo = '';
		}

		//urlVideo = 'http://localhost/bluetube/video.mp4';

		jwplayer("VideoPlayer").setup({
			file: urlVideo,
			width: "100%",
			height: "100%"
		});

		//Esto es para que no se reproduzca al inicio el video por defecto
		if (idVideo !== '') {

			jwplayer("VideoPlayer").play();
		}

		jwplayer("VideoPlayer").onComplete(function() {

			$scope.removeVideoFromPlaylist($scope.indexCurrentReproduction);
		});
	};

	//Metodos
	$scope.playVideoOnJWPLayer('');
	$scope.getCurrentPlaylistBackend();
}