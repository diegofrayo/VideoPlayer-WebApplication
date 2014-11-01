var app = angular.module("VideoPlayerApp",[]);

app.controller("ControladorFormularioBusquedas", ['$scope', controladorBusquedaVideos]);

function controladorBusquedaVideos($scope){

	$scope.listaResultados = {items: []};
	$scope.inputBusqueda = "";
	$scope.listaReproduccion = {items: []};
	$scope.indiceReproduccionActual = -1;
	$scope.siLaListaSeEstaReproduciendo = false;
	$scope.sizeListaReproduccion = $scope.listaReproduccion.items.length;

	$scope.hacerBusqueda = function(){

		var successJson = function(response) {

			var listaResultadosBusqueda = response.items;
			var numeroResultadosBusqueda = listaResultadosBusqueda.length;
			var listaVideos =  {items: []};

			for (var i = 0; i < numeroResultadosBusqueda; i++) {

				itemBusqueda = listaResultadosBusqueda[i];

				itemVideo = createItemVideo(itemBusqueda.id.videoId,
					itemBusqueda.snippet.title,
					itemBusqueda.snippet.title.substring(0, 35) + "...",
					itemBusqueda.snippet.channelId,
					itemBusqueda.snippet.channelTitle,
					generateDuration(),
					itemBusqueda.snippet.thumbnails.medium.url);

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

	$scope.addVideoAListaDeReproduccion = function(index){

		var videoBusquedaSeleccionado = $scope.listaResultados.items[index];
		var videoParaAgregarALista = createItemVideo(
			videoBusquedaSeleccionado.id,
			videoBusquedaSeleccionado.titulo_completo,
			videoBusquedaSeleccionado.titulo_recortado,
			videoBusquedaSeleccionado.id_canal,
			videoBusquedaSeleccionado.nombre_canal,
			videoBusquedaSeleccionado.duracion,
			videoBusquedaSeleccionado.imagen);

		$scope.listaReproduccion.items.push(videoParaAgregarALista);
		$scope.sizeListaReproduccion = $scope.listaReproduccion.items.length;
	}

	$scope.borrarVideoDeListaDeReproduccion = function(index){

		var listaNueva = {items: []};
		var listaReproduccion =  $scope.listaReproduccion.items;
		var sizeListaReproduccion = $scope.sizeListaReproduccion;

		for (var i = 0; i < sizeListaReproduccion; i++) {

			itemLista = listaReproduccion[i];

			if(i != index){

				listaNueva.items.push(itemLista);
			}
		}

		$scope.listaReproduccion = listaNueva;
		$scope.sizeListaReproduccion = $scope.listaReproduccion.items.length;

		//Si la lista se esta reproduciendo
		if($scope.siLaListaSeEstaReproduciendo){

			//Si se eliminó el item que se estaba reproduciendo
			if($scope.indiceReproduccionActual == index){

				switch($scope.sizeListaReproduccion){

					//Si la lista quedó vacia
					case 0:

					$scope.siLaListaSeEstaReproduciendo= false;
					$scope.indiceReproduccionActual = -1;
					break;

					//Si solo quedó un elemento
					case 1:

					$scope.indiceReproduccionActual = 0;
					break;

					//Si hay 2 o mas elementos
					default:

					$scope.indiceReproduccionActual--;
					$scope.verSiguienteVideo();
					break;
				}

			//Si se eliminó un item que no se estaba reproduciendo
		}else{

			switch($scope.sizeListaReproduccion){

					//Si la lista quedó vacia
					case 0:

					$scope.siLaListaSeEstaReproduciendo= false;
					$scope.indiceReproduccionActual = -1;
					break;

					default:

					if($scope.indiceReproduccionActual > index){

						$scope.indiceReproduccionActual--;
					}
					break;

				}
			}
		}

		detenerReproductor();
	}


	$scope.limpiarLista = function(){

		if(confirm("¿Esta seguro de borrar todos los elementos de la lista de reproduccion?")) {

			$scope.listaReproduccion =  {items: []};
			$scope.sizeListaReproduccion = $scope.listaReproduccion.items.length;
			$scope.indiceReproduccionActual = -1;
			$scope.siLaListaSeEstaReproduciendo = false;

			detenerReproductor();
		}
	}

	$scope.reproducirVideo = function(index){

		var videoSeleccionado = $scope.listaReproduccion.items[index];
		$scope.indiceReproduccionActual = index;
		$scope.siLaListaSeEstaReproduciendo = true;

		reproducirVideoJwPlayer(videoSeleccionado.id);
		removeClassActiveItem();
		addClassActiveItem(index);
	}

	$scope.verAnteriorVideo = function(){

		var sizeListaReproduccion = $scope.listaReproduccion.items.length;
		var indiceActual = $scope.indiceReproduccionActual;

		if(sizeListaReproduccion > 1 && $scope.siLaListaSeEstaReproduciendo){

			removeClassActiveItem();

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

		if(sizeListaReproduccion > 1 && $scope.siLaListaSeEstaReproduciendo){

			removeClassActiveItem();

			if(indiceActual==sizeListaReproduccion-1){

				indiceActual = 0;
			}else{

				indiceActual = indiceActual + 1;
			}

			$scope.indiceReproduccionActual = indiceActual;
			var urlVideo = $scope.listaReproduccion.items[indiceActual].id;
			reproducirVideoJwPlayer(urlVideo);
			addClassActiveItem(indiceActual);
			//console.log(indiceActual);
		}
	}

}





function youtube(){

	// $scope.hacerBusqueda = function(){

	// 	var q = $scope.inputBusqueda;

	// 	if(q.trim() != ''){

	// 		var request = gapi.client.youtube.search.list({
	// 			q: q,
	// 			part: 'snippet',
	// 			type: 'video',
	// 			maxResults: 15,
	// 			order: 'relevance',
	// 			videoDuration: 'medium'
	// 		});

	// 		request.execute(function(response) {

	// 			var listaResultadosBusqueda = response.items;
	// 			var numeroResultadosBusqueda = listaResultadosBusqueda.length;
	// 			var listaVideos =  {items: []};

	// 			for (var i = 0; i < numeroResultadosBusqueda; i++) {

	// 				itemBusqueda = listaResultadosBusqueda[i];

	// 				itemVideo = createItemVideo(itemBusqueda.id.videoId,
	// 					itemBusqueda.snippet.title,
	// 					itemBusqueda.snippet.title.substring(0, 35) + "...",
	// 					itemBusqueda.snippet.channelId,
	// 					itemBusqueda.snippet.channelTitle,
	// 					generateDuration(),
	// 					itemBusqueda.snippet.thumbnails.medium.url);

	// 				var requestDuration = gapi.client.youtube.videos.list({
	// 					id: itemVideo.id,
	// 					part: 'contentDetails'
	// 				});

	// 				requestDuration.execute(function(response) {

	// 					var duracion = response.items[0].contentDetails.duration;
	// 					duracion = duracion.replace('PT', '').replace('M',':').replace('S','');
	// 					//console.log(duracion);
	// 					itemVideo.duracion = duracion;
	// 				});

	// 				listaVideos.items.push(itemVideo);
	// 			}

	// 			$scope.$apply(function(){

	// 				$scope.listaResultados = listaVideos;
	// 			});
	// 		});
	// 	}
	// }
}

function leerJson(){

	// $scope.hacerBusqueda = function(){

	// 	var successJson = function(response) {

	// 		var listaResultadosBusqueda = response.items;
	// 		var numeroResultadosBusqueda = listaResultadosBusqueda.length;
	// 		var listaVideos =  {items: []};

	// 		for (var i = 0; i < numeroResultadosBusqueda; i++) {

	// 			itemBusqueda = listaResultadosBusqueda[i];

	// 			itemVideo = createItemVideo(itemBusqueda.id.videoId,
	// 				itemBusqueda.snippet.title,
	// 				itemBusqueda.snippet.title.substring(0, 35) + "...",
	// 				itemBusqueda.snippet.channelId,
	// 				itemBusqueda.snippet.channelTitle,
	// 				generateDuration(),
	// 				itemBusqueda.snippet.thumbnails.medium.url);

	// 			listaVideos.items.push(itemVideo);
	// 		}

	// 		$scope.$apply(function(){

	// 			$scope.listaResultados = listaVideos;
	// 		});
	// 	}

	// 	$.ajax({
	// 		url:'/bluetube/data/json.json',
	// 		datatype:'json',
	// 		data:{},
	// 		success: successJson,
	// 		error: function(response) {
	// 			console.log('Error');
	// 		}
	// 	});

	// }
}






