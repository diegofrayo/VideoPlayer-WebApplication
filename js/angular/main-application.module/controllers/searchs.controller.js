function SearchsController($scope, playlistService, httpService){

	//Variables busqueda
	$scope.resultsList = {items: []};
	$scope.inputSearch = "";

	$scope.searchVideos = function(){

		//searchWithYoutubeAPI($scope);
		searchWithJSON($scope, httpService);
	};

	$scope.addVideoToPlaylist = function(index){

		var videoItemSelected = $scope.resultsList.items[index];

		var successFunction = function(data, status, headers, config){

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
			
			// $scope.$safeApply(function(){
				playlistService.addSong(videoItem);
			// });

			alert(playlistService.getSizePlaylist());
			// console.log('Success - Add Video To The Playlist');
		};

		var errorFunction = function(data, status, headers, config){

			$('.ResponseMessageSearch').html('Can not to add the video to the playlist');
			// console.log(response.responseText);
			// console.log('Error - Add Video To The Playlist');
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

		httpService.post('saveVideo', data, successFunction, errorFunction);
	}
}



/*
--------------------------------------------------------
------------------Metodos para buscar-----------------
--------------------------------------------------------
*/
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


function searchWithJSON($scope, httpService){

	var successFunction = function(data, status, headers, config) {

		var resultsListBusqueda = data.items;
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

		$scope.resultsList = videoList;
	}

	httpService.get('/data/json.json', successFunction);
}