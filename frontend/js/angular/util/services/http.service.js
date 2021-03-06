function httpService($http, $q) {

	var httpApi = {
		get: function(url, successFunction, failFunction) {
			$http.get(url).success(successFunction).error(getFailFunction(failFunction));
		},
		post: function(url, data, successFunction, failFunction) {
			$http.post('backend/index.php/' + url, data).success(successFunction).error(getFailFunction(failFunction));
		}
	};

	return httpApi;
}

function getFailFunction(failFunction) {

	if (!failFunction) {
		failFunction = function() {
			console.log('Error');
		};
	}

	return failFunction;
}