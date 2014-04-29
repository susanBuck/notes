var Playlist = new Class({

		Implements: [Events, Options],

		options: {
			'swfLocation': 'MooSound.swf'
		},

		initialize: function(options) {
			this.setOptions(options);
			window.addEvent('domready', function() { 
				this.swiffHome = new Element('div', {id: 'swiffHome'}).setStyles({position:'absolute','top':1,'left':1}).inject(document.body);
				this.obj = new Swiff(this.options.swfLocation, {width: 1, height: 1, container: this.swiffHome, swLiveConnect: true}); 
			}.bind(this));
			this.flashLoaded = false;
			this.loadQueue = [];
			this.sounds = new Hash();	
			this.playing = []; 
		},

		loadSounds: function(sounds, options) {
			if (!this.flashLoaded) {
				this.loadQueue.push([sounds,options]);
			} else {
				sounds = sounds || [];
				sounds.each(function(url) {
					this.loadSound(url, options);
				}, this);
			}
			return this;
		},

		loadSound: function(url, options) {
			if (!this.flashLoaded) { this.loadQueue.push([url,options]); }
			this.sounds.set(url, new Sound(url, this, options));
			return this;
		},

		stopSounds: function() {
			this.playing.each( function(sound) { sound.stop(); });
			return this;
		},

		playRandom: function() {
			var randomKey = this.sounds.getKeys().getRandom();
			this.stopSounds();
			var sound = this.sounds.get(randomKey);
			sound.start(0);
			return this;
		},

		onSoundLoaded: function(url) {
			this.sounds.get(url).fireEvent('onLoad');
		},

		onSoundComplete: function(url) {
			this.sounds.get(url).fireEvent('onComplete').fireEvent('onStop');
			return this;
		},

		onFlashLoaded: function() {
			this.flashLoaded = true;
			this.loadQueue.each(function(arr) { this.loadSounds(arr[0], arr[1]); }.bind(this));
		},

		registerID3: function(url, tag, value) {
			var sound = this.getSound(url);
			sound.id3.set(tag, value);
			sound.fireEvent('onID3', [tag, value]);
		},

		getSound: function(key) {
			return this.sounds.get(key);
		}

});

var Sound = new Class({ 

	Implements: [Options, Events],

	options: {
		autostart: false,  //autostart
		streaming: true,   //streaming
		volume: 50,        //volume to start at
		pan: 0,            //pan between -100 (left) and 100 (right)
		progressInterval: 500, //milliseconds between getProgress(); calls
		positionInterval: 500,//milliseconds between getPosition(); calls
		onRegister: $empty,//fires when the sound is registered
		onLoad: $empty,    //fires when the sound is downloaded
		onPlay: $empty,    //fires when the sound begins playing
		onPause: $empty,   //fires when the sound is paused
		onStop: $empty,    //fires when the sound stops playing
		onComplete: $empty, //fires when the sound completes playing
		onProgress: $empty,//fires when download makes progress
		onPosition: $empty,//fires when position within the song changes
		onID3: $empty      //fires when ID3 tags become available
	},

	initialize: function(url, manager, options) {
		this.setOptions(options);
		this.url = url;
		this.id3 = new Hash();
		this.manager = manager || Playlist;
		this.swf = this.manager.obj.toElement();
		this.playing = false;
		this.listeners = {};
		this.filesize = null;
		this.duration = null;
		this.pausedAt = 0;
		this.position = 0;
		this.register();
	},

	start: function(position) {
		var pos = position || this.pausedAt;
		this.swf.startSound(this.url, pos, this.options.volume, this.options.pan);
		this.fireEvent('onPlay');
		this.pausedAt = 0;
		return this;
	},

	stop: function() {
		this.swf.stopSound(this.url);
		this.fireEvent('onStop');
		return this;
	},

	jumpTo: function(seconds) {
		$clear(this.listeners.position);
		this.start(seconds);
	},

	pause: function() {
		this.swf.stopSound(this.url);
		this.pausedAt = this.getPosition();
		this.fireEvent('onPause', this.pausedAt);
		this.fireEvent('onStop');
	},

	setVolume: function(volume) {
		this.obj.setVolume(this.url, volume);
		this.options.volume = volume;
		return this;
	},

	setPan: function(pan) {
		this.swf.setPan(this.url, pan);
		this.options.pan = pan;
		return this;
	},

	getVolume: function() {
		return this.options.volume;
	},

	getPan: function() {
		return this.options.pan;
	},

	getID3: function(tag) {
		return this.id3.get(tag);	
	},

	getBytesLoaded: function() {
		return this.swf.getBytesLoaded(this.url);
	}, 

	getFilesize: function() {
		return this.swf.getBytesTotal(this.url);
	},

	getPosition: function() {
		return this.swf.getPosition(this.url);
	}, 

	getDuration: function() {
		return this.swf.getDuration(this.url);
	},

	checkProgress: function() {
		if ($type(this.filesize) !== "number") { this.filesize = this.getFilesize(); }
		var loaded = this.getBytesLoaded(); 
		if ($type(loaded) === "number" && loaded !== this.listeners.lastProgress) { 
			var total = this.getFilesize();
			this.listeners.lastProgress = loaded;
			this.fireEvent('onProgress', [loaded, total]); 
		}
	},

	checkPosition: function() {
		var position = this.getPosition();
		this.duration = this.getDuration();
		if ($type(position) === "number" && position !== this.listeners.lastPosition) { 
			this.listeners.lastPosition = position;
			this.fireEvent('onPosition', [(position / 1000).round(), (this.duration / 1000).round()]);
		}
	},

	register: function() {
		this.fireEvent('onRegister');
		if (this.options.streaming === false) {
			this.swf.preloadSound(this.url);
			this.listeners.progress = this.checkProgress.periodical(this.options.progressInterval, this);
		}
		this.addEvents({'onLoad': this.onLoad, 'onStop': this.onStop, 'onPlay': this.onPlay});
	},

	onLoad: function() {
		$clear(this.listeners.progress);
		this.checkProgress();
	},

	onPlay: function() {
		if (this.options.streaming === true) {
			this.listeners.progress = this.checkProgress.periodical(this.options.progressInterval, this);
		}
		this.playing = true;
		this.listeners.position = this.checkPosition.periodical(this.options.positionInterval, this);
		this.manager.playing.push(this);
	},

	onStop: function() {
		$clear(this.listeners.position);
		if (this.pausedAt === 0) { this.fireEvent('onPosition', [0, this.duration]); }
		this.playing = false;
	}

});

//Comment out and reinstanciate if you want to add your own options.
Playlist = new Playlist();