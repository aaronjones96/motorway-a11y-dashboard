//
'use strict';

const fs = require('fs');
const environment = (process.env.NODE_ENV || 'development');
const jsonPath = `./config/${environment}.json`;
const jsPath = `./config/${environment}.js`;

if (fs.existsSync(jsonPath)) {
	module.exports = require(jsonPath);
} else if (fs.existsSync(jsPath)) {
	module.exports = require(jsPath);
} else {
	module.exports = {
		port: Number(env('PORT', '4000')),
		noindex: env('NOINDEX', 'true') === 'true',
		readonly: env('READONLY', 'false') === 'true',

		webservice: env('WEBSERVICE_URL', {
			database: env('WEBSERVICE_DATABASE', 'mongodb://localhost/pa11y-webservice'),
			host: env('WEBSERVICE_HOST', '0.0.0.0'),
			port: Number(env('WEBSERVICE_PORT', '3000')),
			cron: env('WEBSERVICE_CRON', false)
		})
	};
}

function env(name, defaultValue) {
	const value = process.env[name];
	return typeof value === 'string' ? value : defaultValue;
}
