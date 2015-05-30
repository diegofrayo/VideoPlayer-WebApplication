function httpService($http) {

	var httpInterface = {
		get: function(url, successFunction, failFunction){
			$http.get(url).success(successFunction).error(getFailFunction(failFunction));
		},
		post: function(url, data, successFunction, failFunction){
			$http.post('/framework-backend/index.php/' + url, data).success(successFunction).error(getFailFunction(failFunction));
		}
	};

	return httpInterface;
}

function getFailFunction(failFunction){

	if(!failFunction){

		failFunction = function(){
			console.log('Error');
		};
	}

	return failFunction;
}