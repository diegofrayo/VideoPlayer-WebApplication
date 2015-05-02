function mainController($scope){
	
	//Variables busqueda
	$scope.resultsList = {items: []};
	$scope.inputSearch = "";

	//Variables playlist
	$scope.playlist = {items: []};
	$scope.indexCurrentReproduction = -1;
	$scope.isPlayingThePlaylist = false;
	$scope.sizePlaylist = $scope.playlist.items.length;

	$scope.searchVideos = function(){

		searchWithYoutubeAPI($scope);
	}

	$scope.addVideoToPlaylist = function(index){

		var videoItemSelected = $scope.resultsList.items[index];

		var data = {
			'action': 'saveVideo',
			'id': 0,
			'title': videoItemSelected.complete_title,
			'duration': videoItemSelected.duration,
			'channel_name': videoItemSelected.channel_name,
			'playlist_id': 1,
			'picture_url': videoItemSelected.picture_url,
			'youtube_video_id':videoItemSelected.youtube_video_id 
		};

		var configRequest = {
			type: 'post',
			datatype: 'json',
		};

		var successFunction = function(response){

			//Video item para agregar a la lista de reproduccion
			var videoItem = createItemVideo(
				response.id,
				videoItemSelected.complete_title,
				videoItemSelected.channel_id,
				videoItemSelected.channel_name,
				videoItemSelected.duration,
				videoItemSelected.picture_url,
				videoItemSelected.youtube_video_id
				);
			
			$scope.$apply(function(){
				$scope.playlist.items.push(videoItem);
				$scope.sizePlaylist = $scope.playlist.items.length;
			});

			// console.log('Success - Add Video To The Playlist');
		}

		var errorFunction = function(response){

			$('.ResponseMessageSearch').html('Can not to add the video to the playlist');
			// console.log(response.responseText);
			// console.log('Error - Add Video To The Playlist');
		}

		ajaxRequest(successFunction, errorFunction, configRequest, data);
	}

	$scope.playVideoOnJWPLayer = function(idVideo){

		jwplayer("VideoPlayer").stop();
		var urlVideo = "http://www.youtube.com/watch?v=" + idVideo;

		//Si la cadena es vacia no carga ningun video
		if(idVideo==''){

			urlVideo = '';
		}

		//urlVideo = 'http://localhost/bluetube/video.mp4';

		jwplayer("VideoPlayer").setup({
			file: urlVideo,
			width: "100%",
			height: "100%"
		});

		//Esto es para que no se reproduzca al inicio el video por defecto
		if(idVideo!=''){

			jwplayer("VideoPlayer").play();
		}

		jwplayer("VideoPlayer").onComplete(function(){

			$scope.removeVideoFromPlaylist($scope.indexCurrentReproduction);
		});
	}

	$scope.stopVideoPlayer = function(){

		jwplayer("VideoPlayer").stop();
		jwplayer("VideoPlayer").setup({
			file: '',
			width: "100%",
			height: "100%"
		});

		jwplayer("VideoPlayer").onComplete(function(){
			$scope.removeVideoFromPlaylist($scope.indexCurrentReproduction);
		});
	}

	$scope.removeVideoFromPlaylist = function(index){

		var newList = {items: []};
		var playList =  $scope.playlist.items;
		var sizePlaylist = $scope.sizePlaylist;
		var videoItemSelected = $scope.playlist.items[index];

		var data = {
			'action': 'deleteVideo',
			'videoId': videoItemSelected.id
		};

		var configRequest = {
			type: 'post',
			datatype: 'text'
		};

		var successFunction = function(){

			for (var i = 0; i < sizePlaylist; i++) {

				itemLista = playList[i];

				if(i != index){

					newList.items.push(itemLista);
				}
			}

			$scope.$apply(function(){

				$scope.playlist = newList;
				$scope.sizePlaylist = $scope.playlist.items.length;
			});

			//Si la lista se esta reproduciendo
			if($scope.isPlayingThePlaylist){

				//Si se eliminó el item que se estaba reproduciendo
				if($scope.indexCurrentReproduction == index){

					switch($scope.sizePlaylist){

						//Si la lista quedó vacia
						case 0:

						$scope.isPlayingThePlaylist= false;
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
				}else{

					if($scope.indexCurrentReproduction > index){

						$scope.indexCurrentReproduction--;
					}
				}
			}

			// console.log('Success - Delete Video To The Playlist');
		}

		var errorFunction = function(){

			$('.ResponseMessageSearch').html('The video can not be deleted from the playlist');
			// console.log(response);
			// console.log('Error - Delete Video To The Playlist');
		}

		ajaxRequest(successFunction, errorFunction, configRequest, data);
	}

	$scope.cleanPlaylist = function(){

		if($scope.sizePlaylist>0){

			if(confirm("Are you sure you want to delete all items of the playlist?")) {

				var data = {
					action : 'cleanPlaylist'
				};

				var configRequest = {
					type: 'post',
					datatype: 'text'
				};

				var successFunction = function(){

					$scope.$apply(function(){

						$scope.playlist =  {items: []};
						$scope.sizePlaylist = $scope.playlist.items.length;
						$scope.indexCurrentReproduction = -1;
						$scope.isPlayingThePlaylist = false;

						$scope.stopVideoPlayer();
					});

					// console.log('Success - Clean playlist in backend');
				}

				var errorFunction = function(){
					
					//console.log('Error - Clean playlist in backend');
				}

				ajaxRequest(successFunction, errorFunction, configRequest, data);
			}
		}
	}

	$scope.playVideo = function(index){

		var selectedVideo = $scope.playlist.items[index];
		$scope.indexCurrentReproduction = index;
		$scope.isPlayingThePlaylist = true;

		$scope.playVideoOnJWPLayer(selectedVideo.youtube_video_id);
		removeClassActiveItem();
		addClassActiveItem(index);
	}

	$scope.prevVideo = function(){

		var sizePlaylist = $scope.playlist.items.length;
		var currentIndex = $scope.indexCurrentReproduction;

		if(sizePlaylist > 1 && $scope.isPlayingThePlaylist){

			removeClassActiveItem();

			if(currentIndex==0){

				currentIndex = sizePlaylist - 1;
			}else{

				currentIndex = currentIndex- 1;
			}

			$scope.indexCurrentReproduction = currentIndex;

			var urlVideo = $scope.playlist.items[currentIndex].youtube_video_id;
			$scope.playVideoOnJWPLayer(urlVideo);
			addClassActiveItem(currentIndex);
		}
	}

	$scope.nextVideo = function(){

		var sizePlaylist = $scope.playlist.items.length;
		var currentIndex = $scope.indexCurrentReproduction;

		if(sizePlaylist > 1 && $scope.isPlayingThePlaylist){

			removeClassActiveItem();

			if(currentIndex==sizePlaylist-1){

				currentIndex = 0;
			}else{

				currentIndex = currentIndex + 1;
			}

			var urlVideo = $scope.playlist.items[currentIndex].youtube_video_id;
			$scope.indexCurrentReproduction = currentIndex;
			$scope.playVideoOnJWPLayer(urlVideo);
			addClassActiveItem($scope.indexCurrentReproduction);
		}
	}

	$scope.getCurrentPlaylistBackend = function(){

		var data = {
			action : 'getCurrentPlaylist'
		};

		var configRequest = {
			type: 'get',
			datatype: 'json'
		};

		var successFunction = function(response){

			var videoItem = null;

			for (var i = 0; i < response.length; i++) {

				videoItem = response[i];

				videoItemNew = createItemVideo(
					videoItem.id, 
					videoItem.title,
					'-', 
					videoItem.channel_name, 
					videoItem.duration, 
					videoItem.picture_url,
					videoItem.youtube_video_id);

				$scope.$apply(function(){

					$scope.playlist.items.push(videoItemNew);
					$scope.sizePlaylist = $scope.playlist.items.length;
				});
			}

			// console.log(JSON.stringify(response));
			// console.log('Success - Get playlist to the backend');
		}

		var errorFunction = function(response){

			//$('.ResponseMessageSearch').html(response);
			// console.log('Error - Get playlist to the backend');
		}

		ajaxRequest(successFunction, errorFunction, configRequest, data);
	}

	//Metodos
	$scope.playVideoOnJWPLayer('');
	$scope.getCurrentPlaylistBackend();
}


function searchWithYoutubeAPI($scope){

	var q = $scope.inputSearch;

	if(q.trim() != ''){

		var request = gapi.client.youtube.search.list({
			q: q,
			part: 'snippet',
			type: 'video',
			maxResults: 15,
			order: 'relevance',
			videoDuration: 'medium'
		});

		request.execute(function(response) {

			var searchResults = response.items;
			var sizeSearchResults = searchResults.length;
			$scope.resultsList =  {items: []};

			for (var i = 0; i < sizeSearchResults; i++) {

				videoItemFound = searchResults[i];

				videoItem = createItemVideo(
					0,
					videoItemFound.snippet.title, 
					videoItemFound.snippet.channelId, 
					videoItemFound.snippet.channelTitle,	
					'', 
					videoItemFound.snippet.thumbnails.medium.url,
					videoItemFound.id.videoId);

				$scope.resultsList.items.push(videoItem);

				$scope.$apply(function(){

					var requestDuration = gapi.client.youtube.videos.list({
						id: $scope.resultsList.items[i].youtube_video_id,
						part: 'contentDetails'
					});

					requestDuration.execute(function(response){

						for (var i = 0; i < $scope.resultsList.items.length; i++){

							if(response.items[0].id == $scope.resultsList.items[i].youtube_video_id){
								
								$scope.$apply(function(){

									var duration = response.items[0].contentDetails.duration;
									duration = duration.replace('PT', '').replace('M',':').replace('S','');
									$scope.resultsList.items[i].duration = duration; 
								});
							}
						}
					});
				});
			}

			if(sizeSearchResults == 0){

				$('.ResponseMessageSearch').html('Not videos found');

				$scope.$apply(function(){

					$scope.resultsList = {items: []};
				});
				
			}else{

				$('.ResponseMessageSearch').html('Videos found: ' + sizeSearchResults);
			}
		});
}
}

function searchWithJSON($scope){

	var successJson = function(response) {

		var resultsListBusqueda = response.items;
		var sizeResultsSearch = resultsListBusqueda.length;
		var videoList =  {items: []};

		for (var i = 0; i < sizeResultsSearch; i++) {

			videoItemFound= resultsListBusqueda[i];

			videoItem = createItemVideo(
				0,
				videoItemFound.snippet.title, 
				videoItemFound.snippet.channelId, 
				videoItemFound.snippet.channelTitle,	
				generateDuration(), 
				videoItemFound.snippet.thumbnails.medium.url,
				videoItemFound.id.videoId);

			videoList.items.push(videoItem);
		}

		if(sizeResultsSearch == 0){

			$('.ResponseMessageSearch').html('Not videos found');
		}else{

			$('.ResponseMessageSearch').html('Videos found: ' + sizeResultsSearch);
		}

		$scope.$apply(function(){

			$scope.resultsList = videoList;
		});
	}

	$.ajax({
		url:'/data/json.json',
		datatype:'json',
		data:{},
		success: successJson,
		error: function(response) {
			// console.log('Error');
		}
	});
}

