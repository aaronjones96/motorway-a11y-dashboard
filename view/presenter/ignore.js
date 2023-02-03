//
'use strict';

const standardsArray = require('../../data/standards')();
const rules = createStandardDescriptionMap(standardsArray);

module.exports = presentIgnoreRules;

function presentIgnoreRules(ignore) {
	return ignore.map(name => {
		return {
			name,
			description: rules[name]
		};
	});
}

function createStandardDescriptionMap(standards) {
	const map = {};
	standards.forEach(standard => {
		standard.rules.forEach(rule => {
			map[rule.name] = rule.description;
		});
	});
	return map;
}
