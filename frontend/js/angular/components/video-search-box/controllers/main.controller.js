function VideoSearchsBoxController($scope, $httpService, $rootScope) {

	//Variables busqueda
	$scope.inputSearch = "";

	$scope.searchVideos = function() {

		searchWithYoutubeAPI($scope, $rootScope);
		//searchWithJSON($scope, $httpService, $rootScope);
		console.log('searchVideos');
	};
}



/*
--------------------------------------------------------
------------------Metodos para buscar-----------------
--------------------------------------------------------
*/
function searchWithYoutubeAPI($scope, $rootScope) {

	var q = $scope.inputSearch;

	if (q.trim() != '') {

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
			$rootScope.resultsList = {
				items: []
			};

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

				$rootScope.resultsList.items.push(videoItem);

				$scope.$apply(function() {

					var requestDuration = gapi.client.youtube.videos.list({
						id: $rootScope.resultsList.items[i].youtube_video_id,
						part: 'contentDetails'
					});

					requestDuration.execute(function(response) {

						for (var i = 0; i < $rootScope.resultsList.items.length; i++) {

							if (response.items[0].id == $rootScope.resultsList.items[i].youtube_video_id) {

								$scope.$apply(function() {

									var duration = response.items[0].contentDetails.duration;
									duration = duration.replace('PT', '').replace('M', ':').replace('S', '');
									$rootScope.resultsList.items[i].duration = duration;
								});
							}
						}
					});
				});
			}

			if (sizeSearchResults == 0) {

				$('.ResponseMessageSearch').html('Not videos found');

				$scope.$apply(function() {

					$rootScope.resultsList  = {
						items: []
					};
				});

			} else {

				$('.ResponseMessageSearch').html('Videos found: ' + sizeSearchResults);
			}
		});
	}
}


function searchWithJSON($scope, $httpService, $rootScope) {

	var successFunction = function(data, status, headers, config) {

		var resultsListBusqueda = data.items;
		var sizeResultsSearch = resultsListBusqueda.length;
		var videoList = {
			items: []
		};

		for (var i = 0; i < sizeResultsSearch; i++) {

			videoItemFound = resultsListBusqueda[i];

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

		if (sizeResultsSearch == 0) {

			$('.ResponseMessageSearch').html('Not videos found');
		} else {

			$('.ResponseMessageSearch').html('Videos found: ' + sizeResultsSearch);
		}

		$rootScope.resultsList = videoList;
	}

	$httpService.get('/backend/database/json.json', successFunction);
}