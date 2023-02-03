//
'use strict';

const presentTask = require('../../view/presenter/task');
const getStandards = require('../../data/standards');
const httpHeaders = require('http-headers');

module.exports = route;

// Route definition
function route(app) {

	app.express.get('/:id/edit', (request, response, next) => {
		app.webservice.task(request.params.id).get({}, (error, task) => {
			if (error) {
				return next();
			}
			const standards = getStandards().map(standard => {
				if (standard.title === task.standard) {
					standard.selected = true;
				}
				standard.rules = standard.rules.map(rule => {
					if (task.ignore.indexOf(rule.name) !== -1) {
						rule.ignored = true;
					}
					return rule;
				});
				return standard;
			});
			task.actions = (task.actions ? task.actions.join('\n') : '');
			response.render('task/edit', {
				edited: (typeof request.query.edited !== 'undefined'),
				standards,
				task: presentTask(task),
				isTaskSubPage: true
			});
		});
	});

	/* eslint-disable complexity */
	/* eslint-disable max-statements */
	app.express.post('/:id/edit', (request, response, next) => {
		app.webservice.task(request.params.id).get({}, (error, task) => {
			if (error) {
				return next();
			}
			const originalActions = request.body.actions;
			const originalHeaders = request.body.headers;

			request.body.ignore = request.body.ignore || [];
			request.body.timeout = request.body.timeout || undefined;
			request.body.wait = request.body.wait || undefined;

			if (request.body.actions) {
				request.body.actions = request.body.actions.split(/[\r\n]+/)
					.map(action => {
						return action.trim();
					})
					.filter(action => {
						return Boolean(action);
					});
			}

			if (!request.body.actions) {
				request.body.actions = [];
			}

			request.body.username = request.body.username || undefined;
			request.body.password = request.body.password || undefined;
			request.body.hideElements = request.body.hideElements || undefined;
			request.body.headers = httpHeaders(request.body.headers || '', true);

			app.webservice.task(request.params.id).edit(request.body, webserviceError => {
				if (webserviceError) {
					task.name = request.body.name;
					task.ignore = request.body.ignore;
					task.timeout = request.body.timeout;
					task.wait = request.body.wait;
					task.actions = originalActions;
					task.username = request.body.username;
					task.password = request.body.password;
					task.headers = originalHeaders;
					task.hideElements = request.body.hideElements;
					const standards = getStandards().map(standard => {
						if (standard.title === task.standard) {
							standard.selected = true;
						}
						standard.rules = standard.rules.map(rule => {
							if (task.ignore.indexOf(rule.name) !== -1) {
								rule.ignored = true;
							}
							return rule;
						});
						return standard;
					});
					return response.render('task/edit', {
						webserviceError,
						standards,
						task,
						isTaskSubPage: true
					});
				}
				response.redirect(`/${request.params.id}/edit?edited`);
			});
		});
	});

}
