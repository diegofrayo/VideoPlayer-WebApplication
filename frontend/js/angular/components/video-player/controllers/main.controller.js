function VideoPlayerController($scope, $rootScope) {

	$scope.sizePlaylist = 0;

	$rootScope.$on('addVideoToPlaylist', function(event, data) {
		$scope.sizePlaylist += 1;
		console.log('VideoPlayerController receive addVideoToPlaylist');
	});

	$rootScope.$on('updateSizePlaylist', function(event, data) {
		$scope.sizePlaylist = data;
		console.log('VideoPlayerController receive updateSizePlaylist');
	});

	$scope.prevVideo = function() {
		console.log('VideoPlayerController send prevVideo');
		$rootScope.$broadcast('executeFunctionFromVideoPlayer', 'prevVideo');
	};

	$scope.nextVideo = function() {
		console.log('VideoPlayerController send nextVideo');
		$rootScope.$broadcast('executeFunctionFromVideoPlayer', 'nextVideo');
	};

	$scope.cleanPlaylist = function() {
		console.log('VideoPlayerController send cleanPlaylist');
		$rootScope.$broadcast('executeFunctionFromVideoPlayer', 'cleanPlaylist');
	};
}