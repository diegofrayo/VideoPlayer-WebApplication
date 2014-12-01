function searchsController($scope, factoryPlaylist){
	
	//Variables
	$scope.resultsList = {items: []};
	$scope.inputSearch = "";

	$scope.searchVideos = function(){

		busquedaPorJSON($scope);
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

		//Necesito actualizar una variable global, o un factory,
		//o una variable del controlador 1. Como hacerlo?
		//Lo necesito hacer para que se actualize la lista en el HTML
		factoryPlaylist.items.push(videoItem);
		console.log(factoryPlaylist.items);
		factoryPlaylist.sizePlaylist = factoryPlaylist.items.length;
		console.log(factoryPlaylist.sizePlaylist);
		globalCurrentPlaylist.items.push(videoItem);
		console.log(globalCurrentPlaylist.items);
	}
}

function busquedaPorYoutubeAPI($scope){

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
		});
	}
}

function busquedaPorJSON($scope){

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
		url:'/bluetube/public/data/json.json',
		datatype:'json',
		data:{},
		success: successJson,
		error: function(response) {
			console.log('Error');
		}
	});
}

function addVideoBackend(){

	var successFunction = function(){

	}

	var errorFunction = function(){

	}

	ajaxRequest(successFunction, errorFunction, configRequest, data);
}


				// var requestDuration = gapi.client.youtube.videos.list({
				// 	id: videoItem.id,
				// 	part: 'contentDetails'
				// });

				// requestDuration.execute(function(response) {

				// 	var duration = response.items[0].contentDetails.duration;
				// 	duration = duration.replace('PT', '').replace('M',':').replace('S','');
				// 	videoItem.duration = duration;
				// });


// function leerduracion(){
// 	$scope.search = function() {
//         $("#text").css("display","none");
//         var q = $scope.inputSearch;
//         var request = gapi.client.youtube.search.list({
//             maxResults: 15,
//             order: 'relevance',
//             part: 'snippet',
//             q: q,
//             type: 'video',
//             videoDuration : "medium"
//         });

//         request.execute(function(response){
//             if(response.result) {
//                 // aqui ya procesan uds la lista de resultados de la variable response.result.items
//                 $scope.$apply(function(){
//                     $scope.res = response.result.items;
//                     var requestDuration = null;
//                     //console.log($scope.res);
//                     for (var i = 0; i < $scope.res.length; i++){
//                             requestDuration = gapi.client.youtube.videos.list({
//                                 id: $scope.res[i].id.videoId,
//                                 part: 'contentDetails'
//                             });
//                             requestDuration.execute(function(response){
//                             for (var i = 0; i < $scope.res.length; i++){
//                                 var codigo = $scope.res[i].id.videoId;
//                                 //console.log(response);
//                                 if(response.items[0].id==codigo){
//                                     $scope.$apply(function(){
//                                         var duration = response.items[0].contentDetails.duration;
//                                         duration = duration.replace('PT', '').replace('M',':').replace('S','');
//                                         $scope.res[i].duration = duration; 
//                                     });
//                                 }
//                             console.log($scope.res[i]);
//                             }
//                         });
//                     }
//                 });
//             }
//         });
//     }
// }
