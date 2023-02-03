//
'use strict';

module.exports = helper;

function helper(hbs) {
	// Compare if one value is greater than another
	hbs.registerHelper('ifgtr', function(conditional, condition, options) {
		if (conditional > condition) {
			// eslint-disable-next-line no-invalid-this
			return options.fn(this);
		}
	});
}
