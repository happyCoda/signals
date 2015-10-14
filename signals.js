define(function () {
	'use strict';

	function Signals() {
		this.signals = [];
	}

	Signals.prototype.listen = function listen(signalType, callback) {
		if (typeof callback === 'undefined') {
			throw new Error('You have to specify a callback function for your signal!');
		} else if (this.find(signalType) !== -1) {
			throw new Error('You are already listening to this signal!');
		} else {
			this.signals.push({
				signalType: signalType,
				callback: callback
			});
		}
	};

	Signals.prototype.unlisten = function unlisten(signalType) {
		var self, signal, unlistened;

		self = this;

		signal = self.find(signalType);

		unlistened = false;

		if (signal !== -1) {
			self.signals.splice(signal, 1);
			unlistened = true;
		}

		return unlistened;
	};

	Signals.prototype.emit = function emit(signalType, message) {
		var signal, after;

		signal = this.find(signalType);

		if (signal === -1) {
			throw new Error('There is no such signal listening!');
		}

		this.signals[signal].callback(message);

		if (this.hasAfter()) {
			after = this.find('after');

			this.signals[after].callback();
		}
	};

	Signals.prototype.find = function find(signalType) {
		var found = -1;

		if (this.signals.length > 0) {
			this.signals.forEach(function (signal, idx) {
				if (signal.signalType === signalType) {
					found = idx;
				}
			});
		}

		return found;
	};

	Signals.prototype.listeningTo = function listeningTo(signalType) {
		var listeningTo = false;

		if (this.find(signalType) !== -1) {
			listeningTo = true;
		}

		return listeningTo;
	};

	Signals.prototype.after = function after(callback) {
		this.signals.push({
			signalType: 'after',
			callback: callback
		});
	}

	Signals.prototype.hasAfter = function hasAfter() {
		var after = false;

		if (this.find('after') !== -1) {
			after = true;
		}

		return after;
	}; 

	return Signals;
});