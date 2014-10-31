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


	//Eventos de los botones
	$('.JS-Button-Remove-Item-List').click(eliminarVideoDeListaDeReproduccionActual);
	$('#JS-Button-Anterior-Video').click(retrocederVideo);
	$('#JS-Button-Siguiente-Video').click(avanzarVideo);
	$('#JS-Button-Limpiar-Lista').click(limpiarListaDeReproduccionActual);
	$('#JS-Button-Agregar-Video-A-Lista').click(agregarVideoALista);
	$('.ContainerItemVideoLista-info > h3').click(reproducirVideo);
	// $('.JS-Option-List-Agregar-A-Lista-Actual').click(agregarVideoAListaDeReproduccionActual);


});

function showModalLists(){

	$('#modalLists').modal();
}

function eliminarVideoDeListaDeReproduccionActual(){

	alert('Probando Eliminar');

	//Hacerlo con ajax

	//Obtener id del boton presionado

	//LLamar a la funcion para borrar la cancion de la bd

	//Obtener el padre del boton presionado con javascript, y borrarlo

	//LLamar metodo para actualizar el numero de los items de la lista
}

function limpiarListaDeReproduccionActual(){

	alert('Probando');
}

function avanzarVideo(){

	alert('Probando');
}

function retrocederVideo(){

	alert('Probando');
}

function agregarVideoALista(){

	alert('Probando');
}

function agregarVideoAListaDeReproduccionActual(){

	alert('Probando');
}

function reproducirVideo(){

	alert('Probando Reproduccion');
}