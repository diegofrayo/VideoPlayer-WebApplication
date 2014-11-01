$(document).ready(function() {

	//Configurando los dropdown
	$('.dropdown-toggle').dropdown();



	//Configurando el scroll personalizado
	var browserName =  getBrowserName();
	var customWheelSpeed = 20;

	if(browserName.indexOf("Firefox") > -1){

		//Si es Android Firefox
		if(navigator.appVersion.indexOf("And") != -1){

			customWheelSpeed = 200;
		}else{
			customWheelSpeed = 1;
		}
	}

	$('#inner-content-div').slimscroll({
		wheelStep: customWheelSpeed,
		size: '10px',
		color: '#afafaf',
		height: '100%',
		alwaysVisible: false
	});



	// Configuracion jwPlayer
	jwplayer.key= "Bm32dbcywxH9h80S7LW+gCuivh2nOVT8F4KM7Q==";

	jwplayer().onComplete(function(){
		alert('Se disparó el evento cuando se acaba el video');
		//LLamar metodo $scope.borrarVideoDeListaDeReproduccion();
	});

});

//Configuracion API Youtube
function init() {

	var apiKey = 'AIzaSyBxPtcZkHUU5tVxcU9Sdos1KtcLAyekpOg';
	gapi.client.setApiKey(apiKey);
	gapi.client.load('youtube', 'v3', function(){});
}



/*
--------------------------------------------------------
--------------------Metodos jwPlayer--------------------
--------------------------------------------------------
*/

function reproducirVideoJwPlayer(idVideo){
	
	jwplayer("VideoPlayer").setup({
		file: "http://www.youtube.com/watch?v=" + idVideo,
		width: "100%",
		height: "100%"
	});
}

function detenerReproductor(){

	jwplayer().stop();
}



/*
--------------------------------------------------------
---------------------Metodos Utiles---------------------
--------------------------------------------------------
*/

function makeRandomString(){

	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for( var i=0; i < 5; i++ ){

		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

function alertSizeBrowser(){

	var heightBody = $(window).height();
	var widthBody = $(window).width();
	alert("El tamaño del navegador es: \nAncho: "+
		widthBody+"px\nAltura: "+ heightBody+"px\n" + getBrowserName() 
		+ "\nSistema Operativo: " +  navigator.appVersion);
}

function getBrowserName(){

	var ua= navigator.userAgent, tem, 
	M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

	if(/trident/i.test(M[1])){
		tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE '+(tem[1] || '');
	}

	if(M[1]=== 'Chrome'){
		tem= ua.match(/\bOPR\/(\d+)/)
		if(tem!= null) return 'Opera '+tem[1];
	}

	M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);

	return M.join(' ');
}

function generateDuration(){
	
	return "0"+(Math.round(Math.random() * 8) + 1)+":0"+(Math.round(Math.random() * 9));
}



/*
--------------------------------------------------------
------------------Metodos Controladores-----------------
--------------------------------------------------------
*/
function createItemVideo(id, titulo_completo, titulo_recortado, id_canal, nombre_canal, duracion, imagen){
	
	var	itemVideo = { 'id' : id,
	'titulo_completo' : titulo_completo,
	'titulo_recortado' : titulo_recortado,
	'id_canal' : id_canal,
	'nombre_canal' : nombre_canal,
	'duracion' : duracion,
	'imagen' : "img/preview-video.png",
	'repeat' : makeRandomString()};
// "img/preview-video.png"

return itemVideo;
}

function addClassActiveItem(indice){

	var $item =  jQuery('#inner-content-div > div').get(indice);
	jQuery($item).addClass('ContainerItemVideoLista--activo');
}

function removeClassActiveItem(){

	jQuery('#inner-content-div > div').removeClass('ContainerItemVideoLista--activo');
}