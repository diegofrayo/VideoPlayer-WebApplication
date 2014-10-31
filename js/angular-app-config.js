var app = angular.module("VideoPlayerApp",[]);

// var app = angular.module("VideoPlayerApp",['ngRoute']);
// app.config(function ($routeProvider){
// 	$routerProvider.when('/home',{
// 		templateUrl: "views/home.html",
// 		controller: 'ControladorFormularioBusquedas'
// 	})
	// .when('/new/item',{
	// 	templateUrl: 'carpeta/otro.html',
	// 	controller: 'nombreControlador'
	// })
// });

app.controller("ControladorFormularioBusquedas", ['$scope', controladorBusquedaVideos]);

function controladorBusquedaVideos($scope){

	$scope.listaReproduccion = {items: []};
	$scope.listaResultados = {items: []};
	$scope.inputBusqueda = "";
	$scope.indiceReproduccionActual = 0;
	$scope.sizeListaReproduccion = $scope.listaReproduccion.items.length;

	$scope.hacerBusqueda = function(){

		var successJson = function(response) {

			var resultadosBusqueda = response.items;
			var listaVideos =  {items: []};
			var numeroResultados = resultadosBusqueda.length;

			for (var i = 0; i < numeroResultados; i++) {

				itemBusqueda = resultadosBusqueda[i];

				itemVideo = createItemVideo(itemBusqueda.id.videoId,
					itemBusqueda.snippet.title,
					itemBusqueda.snippet.title.substring(0, 35) + "...",
					itemBusqueda.snippet.channelId,
					itemBusqueda.snippet.channelTitle,
					generateDuration(),
					"img/preview-video.png");

				// itemVideo = { 
				// 	'id' : itemBusqueda.id.videoId,
				// 	'titulo_completo' : itemBusqueda.snippet.title,
				// 	'titulo_recortado' : itemBusqueda.snippet.title.substring(0, 35) + "...",
				// 	'id_canal' : itemBusqueda.snippet.channelId,
				// 	'nombre_canal' : itemBusqueda.snippet.channelTitle,
				// 	'duracion' : generateDuration(),
				// 	'imagen' : "img/preview-video.png",
				// 	'repeat' : makeRandomString()};

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
		var videoNuevo = createItemVideo(
			videoSeleccionado.id,
			videoSeleccionado.titulo_completo,
			videoSeleccionado.titulo_recortado,
			videoSeleccionado.id_canal,
			videoSeleccionado.nombre_canal,
			generateDuration(),
			"img/preview-video.png");

		$scope.listaReproduccion.items.push(videoNuevo);
		$scope.sizeListaReproduccion = $scope.listaReproduccion.items.length;
	}

	$scope.borrarVideoDeListaDeReproduccion = function(index){

		var nuevaLista = {items: []};
		var listaReproduccion =  $scope.listaReproduccion.items;
		var numeroResultados = listaReproduccion.length;
		
		for (var i = 0; i < numeroResultados; i++) {

			itemBusqueda = listaReproduccion[i];

			if(i != index){

				nuevaLista.items.push(itemBusqueda);
			}
		}

		$scope.listaReproduccion = nuevaLista;
		$scope.sizeListaReproduccion = $scope.listaReproduccion.items.length;

		// if($scope.indiceReproduccionActual = index){

		// 	if(index == numeroResultados-1 && $scope.sizeListaReproduccion > 0){

		// 		$scope.indiceReproduccionActual = 0;
		// 	}else

		// 	if($scope.sizeListaReproduccion > 0){

		// 		$scope.indiceReproduccionActual = index;
		// 	}

		// 	reproducirVideoJwPlayer($scope.indiceReproduccionActual);
		// }
	}

	$scope.limpiarLista = function(){

		if(confirm("¿Esta seguro?")) {

			$scope.listaReproduccion =  {items: []};
			$scope.sizeListaReproduccion = $scope.listaReproduccion.items.length;
		}
	}

	$scope.reproducirVideo = function(index){

		var videoSeleccionado = $scope.listaReproduccion.items[index];
		removeClassActiveItem($scope.indiceReproduccionActual);
		$scope.indiceReproduccionActual = index;
		reproducirVideoJwPlayer(videoSeleccionado.id);
		addClassActiveItem(index);
	}

	$scope.verAnteriorVideo = function(){

		var sizeListaReproduccion = $scope.listaReproduccion.items.length;
		var indiceActual = $scope.indiceReproduccionActual;

		if(sizeListaReproduccion > 1){

			removeClassActiveItem(indiceActual);

			if(indiceActual==0){

				indiceActual = sizeListaReproduccion - 1;
			}else{

				indiceActual = indiceActual- 1;
			}

			$scope.indiceReproduccionActual = indiceActual;
			var urlVideo = $scope.listaReproduccion.items[indiceActual].id;
			reproducirVideoJwPlayer(urlVideo);
			addClassActiveItem(indiceActual);
		}
	}

	$scope.verSiguienteVideo = function(){

		var sizeListaReproduccion = $scope.listaReproduccion.items.length;
		var indiceActual = $scope.indiceReproduccionActual;

		if(sizeListaReproduccion > 1){

			removeClassActiveItem(indiceActual);

			if(indiceActual==sizeListaReproduccion-1){

				indiceActual = 0;
			}else{

				indiceActual = indiceActual + 1;
			}

			$scope.indiceReproduccionActual = indiceActual;
			var urlVideo = $scope.listaReproduccion.items[indiceActual].id;
			reproducirVideoJwPlayer(urlVideo);
			addClassActiveItem(indiceActual);
		}
	}

}





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



