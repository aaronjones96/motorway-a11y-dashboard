//
'use strict';

const presentIgnoreRules = require('./ignore');
const presentResult = require('./result');

module.exports = presentTask;

function presentTask(task) {

	// Add additional info
	task.href = `/${task.id}`;
	task.hrefDelete = `/${task.id}/delete`;
	task.hrefRun = `/${task.id}/run`;
	task.hrefJson = `/${task.id}.json`;
	task.hrefEdit = `/${task.id}/edit`;
	task.hrefIgnore = `/${task.id}/ignore`;
	task.hrefUnignore = `/${task.id}/unignore`;

	// Enhance the ignored rules
	task.ignore = presentIgnoreRules(task.ignore);

	// Change headers to a string format
	if (task.headers && typeof task.headers === 'object') {
		task.headers = Object.keys(task.headers).map(header => {
			return `${header}: ${task.headers[header]}`;
		}).join('\n');
	}

	// Present the last result if present
	if (task.last_result) {
		task.lastResult = presentResult(task.last_result);
		delete task.last_result;
	}

	return task;
}
