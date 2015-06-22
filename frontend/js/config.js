$(document).ready(function() {
	//Configurando los dropdown
	$('.dropdown-toggle').dropdown();
});

function generateDuration() {
	return "0" + (Math.round(Math.random() * 8) + 1) + ":0" + (Math.round(Math.random() * 9));
}

function addClassActiveItem(index) {
	var query = "#DivScrollPlayList > div:nth-child(" + (index + 1) + ")";
	var $item = jQuery(query);
	jQuery($item).addClass('ContainerItemVideoList--active');
}

function removeClassActiveItem() {
	jQuery('#DivScrollPlayList > div').removeClass('ContainerItemVideoList--active');
}