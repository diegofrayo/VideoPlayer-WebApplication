function playlistService() {

	var playlist = {items: []};
	var sizePlaylist = playlist.items.length;

	var playlistInterface = {
		getPlaylist: function(){
			return playlist;
		},
		getSizePlaylist: function(){
			return sizePlaylist;
		},
		addSong: function(item){
			playlist.items.push(item);
			sizePlaylist = playlist.items.length;
		},
		setPlaylist: function(newPlaylist){
			playlist = newPlaylist;
			sizePlaylist = playlist.items.length;
		}
	};

	return playlistInterface;
}