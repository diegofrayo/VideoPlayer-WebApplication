//------------------Closures------------------//
var UtilClass = (function() {
	return {
		normalizeDuration: function(duration) {
			duration = duration.replace("PT", "");

			//If the duration video is less than one hour
			if (duration.indexOf("H") === -1) {

				var minutes;
				var seconds;
				var arrayDuration;

				//If the duration have a minutes and seconds
				if (duration.indexOf("M") !== -1 && duration.indexOf("S") !== -1) {
					duration = duration.replace("S", "");
					duration = duration.replace("M", ":");
					arrayDuration = duration.split(':');
					minutes = parseInt(arrayDuration[0]);
					seconds = parseInt(arrayDuration[1]);

					//If the duration have a minutes but not seconds
				} else if (duration.indexOf("M") !== -1 && duration.indexOf("S") === -1) {
					duration = duration.replace("M", "");
					minutes = parseInt(duration);
					seconds = "00";

					//If the duration have a seconds but not minutes
				} else if (duration.indexOf("S") !== -1 && duration.indexOf("M") === -1) {
					duration = duration.replace("S", "");
					seconds = parseInt(duration);
					minutes = 0;
				}

				if (typeof seconds === 'number' && seconds < 10) {
					seconds = "0" + seconds;
				}

				if (typeof minutes === 'number' && minutes < 10) {
					minutes = "0" + minutes;
				}

				return minutes + ":" + seconds;
			}

			return duration;
		},
		createObjectError: function(errorMessage) {
			return {
				type: 'error',
				message: errorMessage
			};
		},
		extendsFrom: function(parent, child) {
			if (parent.constructor.name !== 'Object') {
				//child.prototype = new parent();
				child.prototype = Object.create(parent.prototype);
				child.prototype.parent = parent.prototype;
			} else {
				child.prototype = Object.create(parent);
				child.prototype.parent = parent;
			}
			child.prototype.constructor = child;
			return child;
		},
		generateString: function() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for (var i = 0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}
	};
})();



//------------------Interfaces------------------//
ISongsSearcher = {
	search: function() {
		throw new Error("Have to implement this method");
	}
};



//------------------Classes------------------//
function SongClass() {

	switch (arguments.length) {
		case 0:
			this.id = '';
			this.title = '';
			this.duration = '';
			this.source = '';
			this.picture_url = '';
			this.channel_name = '';
			this.source_id = '';
			this.complete_title = '';
			this.short_title = '';
			break;

		case 5:
			this.id = arguments[0];
			this.title = arguments[1];
			this.duration = arguments[2];
			this.source = arguments[3];
			this.source_id = arguments[4]
			break;

		case 8:
			this.id = arguments[0];
			this.title = arguments[1];
			this.duration = arguments[2];
			this.source = arguments[3];
			this.picture_url = arguments[4];
			this.channel_name = arguments[5];
			this.channel_id = arguments[6];
			this.source_id = arguments[7]
			this.complete_title = this.title;
			this.short_title = this.title.substring(0, 25) + "...";
			break;

		default:
			throw new Error('Enter the parameters correctly');
			break;
	}
};

SongClass.prototype.commonProperty = 'Shared for all SongClass instantiated objects';

SongClass.prototype.toString = function() {
	return this.title + " | " + this.duration + " | " + this.source;
};

SongClass.myStaticVariable = 'I am a static variable';



//------------------------------------//

var SongsListClass = (function() {

	function SongsListClass() {
		this.items = new Array();
	}

	SongsListClass.prototype.getList = function() {
		return this.items;
	};

	SongsListClass.prototype.setList = function(list) {
		this.items = list;
	};

	SongsListClass.prototype.addSong = function(song) {
		if (song instanceof SongClass) {
			this.items.push(song);
		} else {
			throw new Error('Wrong parameter');
		}
	};

	SongsListClass.prototype.getSong = function(index) {
		return this.items[index];
	};

	SongsListClass.prototype.getSize = function() {
		return this.items.length;
	};

	return SongsListClass;
})();



//------------------Inheritance------------------//
//Child class
function ChildSongClass() {
	//This calls to constructor of the parent class
	SongClass.apply(this, arguments);
}

//Se hace la herencia
ChildSongClass = UtilClass.extendsFrom(SongClass, ChildSongClass);

//Methods used in case you want to add more properties to the child class
ChildSongClass.prototype.setNewProperty = function(newProperty) {
	this.newProperty = newProperty;
};



//------------------Implementations------------------//
function YoutubeSongsSearcherClass() {};
YoutubeSongsSearcherClass = UtilClass.extendsFrom(ISongsSearcher, YoutubeSongsSearcherClass);
YoutubeSongsSearcherClass.prototype.search = function(query, results, $http, $q) {
	if ((typeof this.search) === "function") {

		if (query.trim() !== "") {

			try {
				var apiKey = 'AIzaSyBxPtcZkHUU5tVxcU9Sdos1KtcLAyekpOg';
				var urlRequest = 'https://www.googleapis.com/youtube/v3/search?videoEmbeddable=true&order=relevance&part=snippet&q=' + query + '&type=video&maxResults=50&key=' + apiKey;
				var jqxhr = $.getJSON(urlRequest, function() {}).done(function(songsResponse) {

					var length = songsResponse.items.length;
					var idSongs = "";
					for (var i = 0; i < length; i++) {
						idSongs += songsResponse.items[i].id.videoId + ",";
					}

					idSongs = idSongs.substring(0, idSongs.length - 1);

					var defered = $q.defer();
					var promise = defered.promise;

					var successFunction = function(data, status, headers, config) {
						var songsList = new SongsListClass();
						for (var i = 0; i < length; i++) {
							var song = data.items[i];
							var songId = song.id;
							var songTitle = song.snippet.title;
							if (songTitle.toLowerCase().indexOf("cover") >= 0) {
								continue;
							}
							if (song.snippet.categoryId === "10") {
								var duration = song.contentDetails.duration;
								duration = UtilClass.normalizeDuration(duration);
								if (duration != null) {
									song = new SongClass(0, songTitle, duration, 'Youtube', song.snippet.thumbnails.medium.url, song.snippet.channelTitle, song.snippet.channelId, songId);
									songsList.addSong(song);
								}
							}
						}
						defered.resolve(songsList);
					};

					var errorFunction = function(error) {
						console.log("Error");
					};

					var urlDetails = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails&id=' + idSongs + '&key=' + apiKey;
					$http.get(urlDetails).success(successFunction).error(errorFunction);

					promise.then(function(data) {
						var dataResults = data;
						var length = dataResults.getSize();
						for (var i = 0; i < length; i++) {
							results.addSong(dataResults.getSong(i));
						}
						$('.ResponseMessageSearch').html("Video found " + length);
					}).catch(function(error) {});
				});

			} catch (error) {
				console.log(error);
			}

		} else {
			alert("Empty string");
		}

	} else {
		throw new Error('The method that you is trying to implement is not defined in the interface');
	}
};

//------------------------------------//

function LocalStorageSongsSearcherClass() {};
LocalStorageSongsSearcherClass = UtilClass.extendsFrom(ISongsSearcher, LocalStorageSongsSearcherClass);
LocalStorageSongsSearcherClass.prototype.search = function(results, $http, $q) {
	if ((typeof this['search']) === "function") {

		var defered = $q.defer();
		var promise = defered.promise;

		var successFunction = function(data, status, headers, config) {

			var results = data.items;
			var numberResults = results.length;
			var songsList = new SongsListClass();
			var response = null;

			if (numberResults == 0) {
				response = UtilClass.createObjectError('Not videos found');
			} else {

				for (var i = 0; i < numberResults; i++) {
					item = results[i];
					song = new SongClass(0, item.snippet.title, generateDuration(), 'LocalStorage', item.snippet.thumbnails.medium.url, item.snippet.channelTitle, item.snippet.channelId, item.id);
					songsList.addSong(song);
				}

				response = {
					type: 'success',
					data: {
						responseMessage: 'Videos found: ' + numberResults,
						songs: songsList
					}
				};
			}

			defered.resolve(response);
		};

		var errorFunction = function(error) {
			console.log(error);
		}

		$http.get('backend/database/localStorage.json').success(successFunction).error(errorFunction);

		promise.then(function(data) {
			var dataResults = data.data.songs;
			for (var i = 0; i < dataResults.getSize(); i++) {
				results.addSong(dataResults.getSong(i));
			};
			$('.ResponseMessageSearch').html(data.data.responseMessage);
		}).catch(function(error) {
			console.log(error);
		});

	} else {
		throw new Error('The method that you is trying to implement is not defined in the interface');
	}
};



//------------------Searcher Factory------------------//
var SearcherFactory = (function() {
	return {
		createSearcher: function(searcherName) {
			switch (searcherName) {
				case 'Youtube':
					return new YoutubeSongsSearcherClass();
					break;

				case 'LocalStorage':
					return new LocalStorageSongsSearcherClass();
					break;
			};
		}
	}
})();