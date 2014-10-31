var app = angular.module("VideoPlayerApp",[]);

// app.controller("ControladorListaReproduccion", ['$scope', ControladorListaReproduccion]);

// function ControladorListaReproduccion($scope){

// 	$scope.listaReproduccion = "";

// 	$scope.$apply(function(){
// 		$scope.listaReproduccion = miFactoria.listaDeReproduccion;
// 	});
// }

app.controller("ControladorFormularioBusquedas", ['$scope', controladorBusquedaVideos]);

function controladorBusquedaVideos($scope){

	$scope.listaReproduccion = {items: []};
	$scope.listaResultados = {items: []};
	$scope.inputBusqueda = "";
	$scope.indiceReproduccionActual = 0;
	$('#numberVideoPlayList').html("Current Playlist (" + $scope.listaReproduccion.items.length+ ")");

	$scope.hacerBusqueda = function(){

		var successJson = function(response) {

			var resultadosBusqueda = response.items;
			var listaVideos =  {items: []};
			var numeroResultados = resultadosBusqueda.length;

			for (var i = 0; i < numeroResultados; i++) {

				itemBusqueda = resultadosBusqueda[i];

				itemVideo = { 
					'id' : itemBusqueda.id.videoId,
					'titulo_completo' : itemBusqueda.snippet.title,
					'titulo_recortado' : itemBusqueda.snippet.title.substring(0, 35) + "...",
					'id_canal' : itemBusqueda.snippet.channelId,
					'nombre_canal' : itemBusqueda.snippet.channelTitle,
					'duracion' : generateDuration(),
					'imagen' : "img/preview-video.png"};

				// itemVideo['index'] = i;
				// itemVideo['id'] = itemBusqueda.id.videoId;
				// itemVideo['titulo_completo'] = itemBusqueda.snippet.title;
				// itemVideo['titulo_recortado'] = itemBusqueda.snippet.title.substring(0, 35) + "...";
				// itemVideo['id_canal'] = itemBusqueda.snippet.channelId;
				// itemVideo['nombre_canal'] = itemBusqueda.snippet.channelTitle;
				// itemVideo['duracion'] = generateDuration();
				// itemVideo['imagen'] = "img/preview-video.png";
				// itemVideo['imagen'] = itemBusqueda.snippet.thumbnails.medium.url;

				listaVideos.items.push(itemVideo);
			}

			$scope.$apply(function(){
				$scope.listaResultados = listaVideos;
			});
		}

		$.ajax({
			url:'/bluetube/data/json.json',
			datatype:'json',
			data:{},
			success: successJson,
			error: function(response) {
				console.log('Error');
			}
		});
	}

	$scope.anadirVideoAListaDeReproduccion = function(index){

		var videoSeleccionado = $scope.listaResultados.items[index];
		$scope.listaReproduccion.items.push(videoSeleccionado);
		$('#numberVideoPlayList').html("Current Playlist (" + $scope.listaReproduccion.items.length+ ")");
	}

	$scope.borrarVideoDeListaDeReproduccion = function(index){

		// var videoSeleccionado = $scope.listaResultados.items[index];
		// $scope.listaReproduccion.items.splice(index,index);

		var nuevaLista = {items: []};
		var listaReproduccion =  $scope.listaReproduccion.items;
		var numeroResultados = listaReproduccion.length;
		
		for (var i = 0; i < numeroResultados; i++) {

			itemBusqueda = listaReproduccion[i];

			if(i != index){

				nuevaLista.items.push(itemBusqueda);
			}
		}
		console.log(listaReproduccion);
		console.log(nuevaLista);
		$scope.listaReproduccion = nuevaLista;
		$('#numberVideoPlayList').html("Current Playlist (" + $scope.listaReproduccion.items.length+ ")");
	}

}

// app.factory('miFactoria', function(){
// 	var listaDeReproduccion = {id: 1, titulo_completo:"dd", 
// 	titulo_recortado:"ddd", id_canal:4, nombre_canal:"d", duracion:"d", imagen:"5"};
// 	return listaDeReproduccion;
// });

function youtube(){
		// var q = $scope.inputBusqueda;
		// var request = gapi.client.youtube.search.list({
		// 	q: q,
		// 	part: 'snippet',
		// 	type: 'video',
		// 	maxResults: 15,
		// 	order: 'relevance',
		// 	videoDuration: 'medium'
		// });

		// request.execute(function(response) {

		// 	var resultadosBusqueda = response.items;
		// 	var listaVideos =  new Array();
		// 	var numeroResultados = resultadosBusqueda.length;

		// 	for (var i = 0; i < numeroResultados; i++) {

		// 		itemBusqueda = resultadosBusqueda[i];
		// 		itemVideo = new Array();

		// 		itemVideo['id'] = itemBusqueda.id.videoId;
		// 		itemVideo['titulo_completo'] = itemBusqueda.snippet.title;
		// 		itemVideo['titulo_recortado'] = itemBusqueda.snippet.title.substring(0, 35) + "...";
		// 		itemVideo['id_canal'] = itemBusqueda.snippet.channelId;
		// 		itemVideo['nombre_canal'] = itemBusqueda.snippet.channelTitle;
		// 		itemVideo['duracion'] = generateDuration();
		// 		itemVideo['imagen'] = itemBusqueda.snippet.thumbnails.medium.url;

		// 		listaVideos[i] = itemVideo;
		// 	}

		// 	$scope.$apply(function(){
		// 		$scope.listaVideos = listaVideos;
		// 	});
		// });
}


angular.modulo('myapp' , ['ngRoute']);

ap.config(function ($routeProvider){
	$routerProvider.when('/new',{

templateUrl: "inicio.html",
controller: 'controlador'
	});

	.when('/new/item',{
'templateUrl': 'carpeta/otro.html',
controller: 'nombreControlador'
	});


});

