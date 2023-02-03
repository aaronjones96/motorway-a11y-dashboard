//
'use strict';

const _ = require('underscore');
const presentIgnoreRules = require('./ignore');
const techs = require('../../data/techniques')();

module.exports = presentResult;

function presentResult(result) {

	// Add additional info
	result.href = `/${result.task}/${result.id}`;
	result.hrefCsv = `/${result.task}/${result.id}.csv`;
	result.hrefJson = `/${result.task}/${result.id}.json`;

	// Parse date
	result.date = new Date(result.date);

	// Enhance the ignored rules
	result.ignore = presentIgnoreRules(result.ignore);

	// Split out message types
	if (result.results) {
		const groupedByType = _.groupBy(result.results, 'type');
		['error', 'warning', 'notice'].forEach(type => {
			const pluralType = `${type}s`;
			const results = groupedByType[type] || [];
			const groupedByCode = _.groupBy(results, 'code');
			result[pluralType] = _.keys(groupedByCode).map(group => {
				const groupMessage = groupedByCode[group][0];
				groupMessage.count = groupedByCode[group].length;
				groupMessage.items = groupedByCode[group].map(plural => ({
					selector: plural.selector,
					context: plural.context
				}));
				// Map standard to techniques
				const data = groupMessage.code.split('.');
				data.splice(0, 4);
				const techniques = data.join('.').split(',').map(code => code.split('.')[0]);
				groupMessage.solutions = techniques.reduce((prev, technique) => {
					if (techs[technique] && techs[technique].title) {
						prev.push({
							title: techs[technique].title || null,
							url: techs[technique].url || null
						});
					}
					return prev;
				}, []);
				return groupMessage;
			})
				.sort((currentItem, nextItem) => {
					return nextItem.count - currentItem.count;
				});
		});
	}

	return result;
}
