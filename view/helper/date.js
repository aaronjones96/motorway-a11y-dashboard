'use strict';

const moment = require('moment');

module.exports = helper;

function helper(hbs) {

	// Format a date with Moment
	hbs.registerHelper('date-format', (context, block) => {
		const format = block.hash.format || 'YYYY-MM-DD HH:mm:ss';
		return moment(context).format(format);
	});

	// Get a relative date
	hbs.registerHelper('date-relative', context => moment(context).fromNow());

	hbs.registerHelper('date-timestamp', context => moment(context).valueOf());

}
