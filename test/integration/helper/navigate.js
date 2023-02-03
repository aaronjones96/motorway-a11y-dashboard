//

// jscs:disable requireArrowFunctions
'use strict';

const cheerio = require('cheerio');
const request = require('request');

module.exports = createNavigator;

// Create a navigate function
function createNavigator(baseUrl, store) {
	return function(opts, callback) {

		store.body = null;
		store.dom = null;
		store.request = null;
		store.response = null;
		store.status = null;

		request({
			url: baseUrl + opts.endpoint,
			method: opts.method || 'GET',
			form: opts.form,
			json: opts.json || false,
			qs: opts.query,
			followAllRedirects: true
		}, function(error, response, body) {
			if (error) {
				return callback(error);
			}

			store.body = body;
			store.request = response.request;
			store.response = response;
			store.status = response.statusCode;

			if (opts.nonDom) {
				store.dom = null;
			} else {
				store.dom = cheerio.load(store.body);
			}
			callback();

		});

	};
}
