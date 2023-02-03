//
'use strict';

const kleur = require('kleur');
const config = require('./config');

process.on('SIGINT', () => {
	console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
	process.exit();
});

require('./app')(config, (error, app) => {
	if (error) {
		console.error(error.stack);
		process.exit(1);
	}

	console.log('');
	console.log(kleur.underline().magenta('Motorway a11y Dashboard started'));
	console.log(kleur.grey('mode: %s'), process.env.NODE_ENV);
	console.log(kleur.grey('uri:  %s'), app.address);

	app.on('route-error', routeError => {
		const stack = (routeError.stack ? routeError.stack.split('\n') : [routeError.message]);
		const msg = kleur.red(stack.shift());
		console.error('');
		console.error(msg);
		console.error(kleur.grey(stack.join('\n')));
	});

	// Start the webservice if required
	if (typeof config.webservice === 'object') {
		require('pa11y-webservice')(config.webservice, (webserviceError, webservice) => {
			if (webserviceError) {
				console.error(webserviceError.stack);
				process.exit(1);
			}

			console.log('');
			console.log(kleur.underline().cyan('Pa11y Webservice started'));
			console.log(kleur.grey('mode:     %s'), process.env.NODE_ENV);
			console.log(kleur.grey('uri:      %s'), webservice.server.info.uri);
			console.log(kleur.grey('database: %s'), config.webservice.database);
			console.log(kleur.grey('cron:     %s'), config.webservice.cron);
		});
	}

});
