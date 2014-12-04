$(document).ready(function() {

	//Configurando los dropdown
	$('.dropdown-toggle').dropdown();


	// Configuracion jwPlayer
	jwplayer('VideoPlayer').key= "Bm32dbcywxH9h80S7LW+gCuivh2nOVT8F4KM7Q==";


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

	var scrollConfig = {
		wheelStep: customWheelSpeed,
		size: '10px',
		color: '#afafaf',
		height: '100%',
		alwaysVisible: false
	};

	$('#DivScrollPlayList').slimscroll(scrollConfig);
	$('#DivScrollResultsSearch').slimscroll(scrollConfig);
});

//Configuracion API Youtube
function initYoutubeApi() {

	var apiKey = 'AIzaSyBxPtcZkHUU5tVxcU9Sdos1KtcLAyekpOg';
	gapi.client.setApiKey(apiKey);
	gapi.client.load('youtube', 'v3', function(){});
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
function createItemVideo(id, completeTitle, channelId, channelName, duration, pictureUrl, youtubeVideoId){

	var	videoItem = { 
		'id' : id,
		'complete_title' : completeTitle,
		'short_title' : completeTitle.substring(0, 25) + "...",
		'channel_id' : channelId,
		'channel_name' : channelName,
		'duration' : duration,
		'picture_url' : pictureUrl,
		'youtube_video_id': youtubeVideoId,
		'repeat' : makeRandomString()
	};

	return videoItem;
}

function addClassActiveItem(index){

	var consulta = "#DivScrollPlayList > div:nth-child(" + (index + 1) + ")";
	var $item = jQuery(consulta);
	jQuery($item).addClass('ContainerItemVideoList--active');
}

function removeClassActiveItem(){

	jQuery('#DivScrollPlayList > div').removeClass('ContainerItemVideoList--active');
}

function ajaxRequest(successFunction, errorFunction, configRequest, data){

	$.ajax({
		'url': '/bluetube/framework-backend/index.php/'+ data.action,
		'type': configRequest.type,
		'data': data,
		'dataType': configRequest.datatype,
		'success': successFunction,
		'error':  errorFunction
	});
}
