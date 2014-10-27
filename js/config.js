var app = angular.module("MyApp",[]);
app.controller("FormularioLogin", ['$scope', controllerFormularioLogin]);

function controllerFormularioLogin($scope){
	
	$scope.username = "";

	$scope.functionPrueba = function(){
		$scope.username = "Hola mundo controlador";
	}
}

function init() {

	var apiKey = 'AIzaSyBxPtcZkHUU5tVxcU9Sdos1KtcLAyekpOg';
	gapi.client.setApiKey(apiKey);

	gapi.client.load('youtube', 'v3', function() {
		busqueda();
	});
}

function busqueda(){

	alert('Probando');

	var q = "tutorial api youtube";
	var request = gapi.client.youtube.search.list({
		q: q,
		part: 'snippet'
	});

	request.execute(function(response) {
		var str = JSON.stringify(response.result);
		console.log(str);
		$('#respuesta').html('<pre>' + str + '</pre>');
	});

}

$(document).ready(function() {

	//Configurando los dropdown
	$('.dropdown-toggle').dropdown();


	//Configurando el scroll personalizado
	var browserName =  getBrowserName();
	var customWheelSpeed = 20;

	if(browserName.indexOf("Firefox") > -1){
		customWheelSpeed = 1;
	}
	$('#inner-content-div').slimscroll({
		wheelStep: customWheelSpeed,
		size: '10px',
		color: '#afafaf',
		height: '100%',
		alwaysVisible: false
	});


	//Eventos de los botones
	$('.JS-Button-Remove-Item-List').click(eliminarVideoDeListaDeReproduccionActual);
	$('#JS-Button-Anterior-Video').click(retrocederVideo);
	$('#JS-Button-Siguiente-Video').click(avanzarVideo);
	$('#JS-Button-Limpiar-Lista').click(limpiarListaDeReproduccionActual);


});

function alertSizeBrowser(){

	var heightBody = $(window).height();
	var widthBody = $(window).width();
	alert("El tamaño del navegador es: \nAncho: "+widthBody+"px\nAltura: "+ heightBody+"px\n" + getBrowserName());
}

function showModalLists(){

	$('#modalLists').modal();
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

function eliminarVideoDeListaDeReproduccionActual(){

	alert('Probando');

	//Hacerlo con ajax

	//Obtener id del boton presionado

	//LLamar a la funcion para borrar la cancion de la bd

	//Obtener el padre del boton presionado con javascript, y borrarlo

	//LLamar metodo para actualizar el numero de los items de la lista
}

function limpiarListaDeReproduccionActual(){

}

function avanzarVideo(){

}

function retrocederVideo(){

}