//

// jscs:disable requireArrowFunctions
'use strict';

const createClient = require('pa11y-webservice-client-node');

module.exports = createWebserviceClient;

// Create a webservice client
function createWebserviceClient(config) {
	let webserviceUrl = config.webservice;
	if (typeof webserviceUrl === 'object') {
		webserviceUrl = `http://${webserviceUrl.host}:${webserviceUrl.port}/`;
	}
	return createClient(webserviceUrl);
}
