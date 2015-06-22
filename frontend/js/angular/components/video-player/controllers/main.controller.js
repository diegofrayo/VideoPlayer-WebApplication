function VideoPlayerController($scope, $rootScope) {

	$scope.sizePlaylist = 0;

	$rootScope.$on('addVideoToPlaylist', function(event, data) {
		$scope.sizePlaylist += 1;
	});

	$rootScope.$on('updateSizePlaylist', function(event, data) {
		$scope.sizePlaylist = data;
	});

	$scope.prevVideo = function() {
		$rootScope.$broadcast('executeFunctionFromVideoPlayer', 'prevVideo');
	};

	$scope.nextVideo = function() {
		$rootScope.$broadcast('executeFunctionFromVideoPlayer', 'nextVideo');
	};

	$scope.cleanPlaylist = function() {
		$rootScope.$broadcast('executeFunctionFromVideoPlayer', 'cleanPlaylist');
	};
}