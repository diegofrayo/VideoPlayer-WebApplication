function playlistController($scope, factoryPlaylist){
	
	$scope.playVideoOnJWPLayer = function(idVideo){

		jwplayer("VideoPlayer").stop();
		var urlVideo = "http://www.youtube.com/watch?v=" + idVideo;

		//Si la cadena es vacia no carga ningun video
		if(idVideo==''){

			urlVideo = '';
		}

		urlVideo = 'http://localhost/bluetube/public/video.mp4';

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

	//Metodos
	$scope.playVideoOnJWPLayer('');

	//Variables
	$scope.playlist = {items: []};
	$scope.indexCurrentReproduction = -1;
	$scope.isPlayingThePlaylist = false;
	$scope.sizePlaylist = $scope.playlist.items.length;
	globalCurrentPlaylist = $scope.playlist;

	$scope.removeVideoFromPlaylist = function(index){

		var newList = {items: []};
		var playList =  $scope.playlist.items;
		var sizePlaylist = $scope.sizePlaylist;

		for (var i = 0; i < sizePlaylist; i++) {

			itemLista = playList[i];

			if(i != index){

				newList.items.push(itemLista);
			}
		}


		if($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest'){

			$scope.$apply(function(){

				$scope.playlist = newList;
			});

		}else{

			$scope.playlist = newList;
		}


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
	}

	$scope.cleanPlaylist = function(){

		if($scope.sizePlaylist>0){

			if(confirm("Are you sure you want to delete all items of the playlist?")) {

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

			var urlVideo = $scope.playlist.items[currentIndex].id;
			$scope.indexCurrentReproduction = currentIndex;
			$scope.playVideoOnJWPLayer(urlVideo);
			addClassActiveItem($scope.indexCurrentReproduction);
		}
	}

}