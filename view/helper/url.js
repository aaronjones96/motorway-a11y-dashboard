//
'use strict';

module.exports = helper;

function helper(hbs) {

	// Simplify url by removing (eg http://, https://, trailing slashes) from url
	hbs.registerHelper('simplify-url', context => {
		return context.replace(/^https?:\/\//i, '').replace(/\/$/, '').toLowerCase();
	});

}
