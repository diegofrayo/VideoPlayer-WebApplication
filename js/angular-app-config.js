var app = angular.module("VideoPlayerApp",[]);

app.controller("MainController", ['$scope', mainController]);

function mainController($scope){

	$scope.playVideoOnJWPLayer = function(idVideo){

		var urlVideo = "http://www.youtube.com/watch?v=" + idVideo;

		//Si la cadena es vacia carga un video por defecto
		if(idVideo==''){

			urlVideo = '';
		}

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
			alert('Se disparó el evento cuando se acaba el video');
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

	//Metodos
	$scope.playVideoOnJWPLayer('');

	//Variables
	$scope.resultsList = {items: []};
	$scope.inputSearch = "";
	$scope.playlist = {items: []};
	$scope.indexCurrentReproduction = -1;
	$scope.isPlayingThePlaylist = false;
	$scope.sizePlaylist = $scope.playlist.items.length;

	$scope.searchVideos = function(){

		var successJson = function(response) {

			var resultsListBusqueda = response.items;
			var sizeResultsSearch = resultsListBusqueda.length;
			var videoList =  {items: []};

			for (var i = 0; i < sizeResultsSearch; i++) {

				videoItemFound= resultsListBusqueda[i];

				videoItem = createItemVideo(videoItemFound.id.videoId,
					videoItemFound.snippet.title,
					videoItemFound.snippet.title.substring(0, 35) + "...",
					videoItemFound.snippet.channelId,
					videoItemFound.snippet.channelTitle,
					generateDuration(),
					videoItemFound.snippet.thumbnails.medium.url);

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
			url:'/bluetube/data/json.json',
			datatype:'json',
			data:{},
			success: successJson,
			error: function(response) {
				console.log('Error');
			}
		});

	}

	$scope.addVideoToPlaylist = function(index){

		var videoItemSelected = $scope.resultsList.items[index];

		//Video item para agregar a la lista de reproduccion
		var videoItem = createItemVideo(
			videoItemSelected.id,
			videoItemSelected.complete_title,
			videoItemSelected.short_title,
			videoItemSelected.channel_id,
			videoItemSelected.channel_name,
			videoItemSelected.duration,
			videoItemSelected.picture_url);

		$scope.playlist.items.push(videoItem);
		$scope.sizePlaylist = $scope.playlist.items.length;
	}

	$scope.removeVideoFromPlaylist = function(index){
		console.log(index);
		var newList = {items: []};
		var playList =  $scope.playlist.items;
		var sizePlaylist = $scope.sizePlaylist;

		for (var i = 0; i < sizePlaylist; i++) {

			itemLista = playList[i];

			if(i != index){

				newList.items.push(itemLista);
			}
		}

		$scope.playlist = newList;
		$scope.sizePlaylist = $scope.playlist.items.length;

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
					break;

					//Si hay 2 o mas elementos
					default:
					alert('fff');
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
	}

	$scope.cleanPlaylist = function(){

		if($scope.sizePlaylist>0){

			if(confirm("Are you sure delete all items of the playlist?")) {

				$scope.playlist =  {items: []};
				$scope.sizePlaylist = $scope.playlist.items.length;
				$scope.indexCurrentReproduction = -1;
				$scope.isPlayingThePlaylist = false;

				$scope.stopVideoPlayer();
			}
		}
	}

	$scope.playVideo = function(index){

		var selectedVideo = $scope.playlist.items[index];
		$scope.indexCurrentReproduction = index;
		$scope.isPlayingThePlaylist = true;

		$scope.playVideoOnJWPLayer(selectedVideo.id);
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
			
			var urlVideo = $scope.playlist.items[currentIndex].id;
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

			addClassActiveItem(currentIndex);
			$scope.indexCurrentReproduction = currentIndex;
			var urlVideo = $scope.playlist.items[currentIndex].id;
			$scope.playVideoOnJWPLayer(urlVideo);
			console.log(currentIndex);
			console.log($scope.playlist);
		}
	}
}





function youtube(){

// 	$scope.searchVideos = function(){

// 		var q = $scope.inputSearch;

// 		if(q.trim() != ''){

// 			var request = gapi.client.youtube.search.list({
// 				q: q,
// 				part: 'snippet',
// 				type: 'video',
// 				maxResults: 15,
// 				order: 'relevance',
// 				videoDuration: 'medium'
// 			});

// 			request.execute(function(response) {

// 				var resultsListBusqueda = response.items;
// 				var sizeResultsSearch = resultsListBusqueda.length;
// 				var videoList =  {items: []};

// 				for (var i = 0; i < sizeResultsSearch; i++) {

// 					videoItemFound= resultsListBusqueda[i];

// 					videoItem = createItemVideo(videoItemFound.id.videoId,
// 						videoItemFound.snippet.title,
// 						videoItemFound.snippet.title.substring(0, 35) + "...",
// 						videoItemFound.snippet.channelId,
// 						videoItemFound.snippet.channelTitle,
// 						generateDuration(),
// 						videoItemFound.snippet.thumbnails.medium.url);

// 					var requestDuration = gapi.client.youtube.videos.list({
// 						id: videoItem.id,
// 						part: 'contentDetails'
// 					});

// 					requestDuration.execute(function(response) {

// 						var duration = response.items[0].contentDetails.duration;
// 						duration = duration.replace('PT', '').replace('M',':').replace('S','');
// 						videoItem.duration = duration;
// 					});

// 					videoList.items.push(videoItem);
// 				}

// 				if(sizeResultsSearch == 0){

// 					$('.ResponseMessageSearch').html('Not videos found');
// 				}else{

// 					$('.ResponseMessageSearch').html('Videos found: ' + sizeResultsSearch);
// 				}

// 				$scope.$apply(function(){

// 					$scope.resultsList = videoList;
// 				});
// 			});
// }
// }
}

function leerJson(){

	// $scope.searchVideos = function(){

	// 	var successJson = function(response) {

	// 		var resultsListBusqueda = response.items;
	// 		var sizeResultsSearch = resultsListBusqueda.length;
	// 		var videoList =  {items: []};

	// 		for (var i = 0; i < sizeResultsSearch; i++) {

	// 			videoItemFound= resultsListBusqueda[i];

	// 			videoItem = createItemVideo(videoItemFound.id.videoId,
	// 				videoItemFound.snippet.title,
	// 				videoItemFound.snippet.title.substring(0, 35) + "...",
	// 				videoItemFound.snippet.channelId,
	// 				videoItemFound.snippet.channelTitle,
	// 				generateDuration(),
	// 				videoItemFound.snippet.thumbnails.medium.url);

	// 			videoList.items.push(videoItem);
	// 		}

	// 		$scope.$apply(function(){

	// 			$scope.resultsList = videoList;
	// 		});
	// 	}

	// 	$.ajax({
	// 		url:'/bluetube/data/json.json',
	// 		datatype:'json',
	// 		data:{},
	// 		success: successJson,
	// 		error: function(response) {
	// 			console.log('Error');
	// 		}
	// 	});

	// }
}






