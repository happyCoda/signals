define([
	'signalsCode'
], function (Signals) {
	var signal;

	beforeEach(function () {
		signal = new Signals();
	});

	describe('Signals library test suite', function () {

		describe('Signals existence', function () {
			it('Should be defined', function () {
				expect(signal).toBeDefined();
			});

			it('Should be an instance of the Signals', function () {
				expect(signal instanceof Signals).toBeTruthy();
			});
		});

		describe('Signals listens', function () {
			it('Should listen to some signal', function () {
				signal.listen('white noize', function () {});

				expect(signal.listeningTo('white noize')).toBeTruthy();
			});
		});

		describe('All signals must have a callback', function () {
			it('Should throw an error if there is no callback parameter', function () {

				expect(function () {
					signal.listen('rock');
				}).toThrow();

			});
		});

		describe('Signal emitter work checking', function () {
			it('Should check for emmited signal', function () {

				spyOn(signal, 'find').and.callThrough();

				signal.listen('echo', function () {});

				signal.emit('echo');

				expect(signal.find).toHaveBeenCalledWith('echo');
			});

			it('Should run the callback', function () {

				var signalType = 'foo';

				callback = jasmine.createSpy();

				signal.listen(signalType, callback);

				signal.emit(signalType, 'Listen up!');

				expect(callback).toHaveBeenCalledWith('Listen up!');

			});
		});

		describe('Signal unlistener work checking', function () {
			it('Should succesfully unfollow given signal', function () {

				var signalType = 'fart noise';

				signal.listen(signalType, function (message) {
					console.log(message);
				});

				expect(signal.unlisten(signalType)).toBeTruthy();
			});
		});

		describe('Signal can call after method', function () {
			it('Shuld succesfully call after method', function () {
				signal.listen('horn', function (message) {
					console.log(message);
				});

				spyOn(signal, 'after').and.callThrough();

				signal.after(function () {
					console.log('After!');
				});

				signal.emit('horn', 'some message');

				expect(signal.after).toHaveBeenCalled();
			});
		});
	});
});