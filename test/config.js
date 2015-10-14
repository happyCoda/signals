require.config({
	baseUrl: './',
	deps: ['main'],
	paths: {
		'jasmine': 'lib/jasmine',
		'jasmine-html': 'lib/jasmine-html',
		'boot': 'lib/boot',
		'signalsSpec': 'spec/signals',
		'signalsCode': '../signals'
	},
	shim: {
		'jasmine-html': {
			deps: ['jasmine'],
			exports: 'window.jasmineRequire'
		},
		'boot': {
			deps: ['jasmine', 'jasmine-html'],
			exports: 'window.jasmineRequire'
		}
	}
});