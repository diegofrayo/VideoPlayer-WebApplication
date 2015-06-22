function PlaylistController($scope, $rootScope, $httpService) {

	$scope.playlist = new SongsListClass();
	$scope.indexCurrentReproduction = -1;
	$scope.isPlayingThePlaylist = false;
	$scope.sizePlaylist = $scope.playlist.getSize();

	jwplayer('jwPlayer').setup({
		file: 'https://www.youtube.com/watch?v=v5MRjk8Lj5o',
		width: "100%",
		height: "100%"
	});
	jwplayer().key = "Bm32dbcywxH9h80S7LW+gCuivh2nOVT8F4KM7Q==";
	jwplayer().onComplete(function() {
		$scope.removeVideoFromPlaylist($scope.indexCurrentReproduction);
	});

	$rootScope.$on('addVideoToPlaylist', function(event, data) {
		$scope.playlist.addSong(data);
		$scope.sizePlaylist += 1;
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
	});

	$scope.playVideo = function(index) {

		var selectedSong = $scope.playlist.getSong(index);
		$scope.indexCurrentReproduction = index;
		$scope.isPlayingThePlaylist = true;
		$scope.playVideoOnJWPLayer(selectedSong.source_id);
		removeClassActiveItem();
		addClassActiveItem(index);
	};

	$scope.stopVideoPlayer = function() {

		jwplayer().stop();
		jwplayer().setup({
			file: "",
			width: "100%",
			height: "100%"
		});
	};

	$scope.removeVideoFromPlaylist = function(index) {

		var newList = new SongsListClass();
		var playList = $scope.playlist;
		var sizePlaylist = $scope.sizePlaylist;
		var songSelected = $scope.playlist.getSong(index);

		var successFunction = function(data, status, headers, config) {

			for (var i = 0; i < sizePlaylist; i++) {

				itemLista = playList.getSong(i);

				if (i != index) {
					newList.addSong(itemLista);
				}
			}

			$scope.playlist = newList;
			$scope.sizePlaylist = $scope.playlist.getSize();
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
		}

		var errorFunction = function() {
			$('.ResponseMessageSearch').html('The video can not be deleted from the playlist');
		}

		var data = {
			'videoId': songSelected.id
		};

		$httpService.post('delete', data, successFunction, errorFunction);
	};


	$scope.getCurrentPlaylistBackend = function() {

		var successFunction = function(data, status, headers, config) {

			var song = null;

			for (var i = 0; i < data.length; i++) {
				song = data[i];
				song = new SongClass(song.id, song.title, song.duration, 'Youtube',
					song.picture_url, song.channel_name, '', song.source_id);
				$scope.playlist.addSong(song);
			}

			$scope.sizePlaylist = $scope.playlist.getSize();

			response = {
				type: 'success',
				data: {
					sizePlaylist: $scope.sizePlaylist,
					songs: $scope.playlist
				}
			};

			$scope.playlist = response.data.songs;
			$scope.sizePlaylist = response.data.sizePlaylist;
			$rootScope.$broadcast('updateSizePlaylist', $scope.sizePlaylist);
		}

		$httpService.get('/backend/index.php/getAll', successFunction);
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
			var urlVideo = $scope.playlist.getSong(currentIndex).source_id;
			$scope.playVideoOnJWPLayer(urlVideo);
			addClassActiveItem(currentIndex);
		}
	};

	$scope.nextVideo = function() {

		var sizePlaylist = $scope.playlist.getSize();
		var currentIndex = $scope.indexCurrentReproduction;

		if (sizePlaylist > 1 && $scope.isPlayingThePlaylist) {

			removeClassActiveItem();

			if (currentIndex == sizePlaylist - 1) {
				currentIndex = 0;
			} else {
				currentIndex = currentIndex + 1;
			}

			var urlVideo = $scope.playlist.getSong(currentIndex).source_id;
			$scope.indexCurrentReproduction = currentIndex;
			$scope.playVideoOnJWPLayer(urlVideo);
			addClassActiveItem($scope.indexCurrentReproduction);
		}
	};

	$scope.cleanPlaylist = function() {

		if ($scope.sizePlaylist > 0) {

			if (confirm("Are you sure you want to delete all items of the playlist?")) {

				var successFunction = function(data, status, headers, config) {
					$scope.playlist = new SongsListClass();
					$scope.indexCurrentReproduction = -1;
					$scope.isPlayingThePlaylist = false;
					$scope.stopVideoPlayer();
					$scope.sizePlaylist = $scope.playlist.getSize();
					$rootScope.$broadcast('updateSizePlaylist', $scope.sizePlaylist);
				}

				$httpService.post('deleteAll', {}, successFunction);
			}
		}
	};

	$scope.playVideoOnJWPLayer = function(idVideo) {
		var urlVideo = "http://www.youtube.com/watch?v=" + idVideo;
		jwplayer().stop();
		jwplayer().load([{
			file: urlVideo
		}]);
		jwplayer().play();
	};

	$scope.getCurrentPlaylistBackend();
}