function init() {

	var apiKey = 'AIzaSyBxPtcZkHUU5tVxcU9Sdos1KtcLAyekpOg';
	gapi.client.setApiKey(apiKey);

	gapi.client.load('youtube', 'v3', function(){
		alert('Conectado');
	});
}