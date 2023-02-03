//
'use strict';

const presentTask = require('../../view/presenter/task');
const presentResult = require('../../view/presenter/result');
const presentResultList = require('../../view/presenter/result-list');

module.exports = route;

// Route definition
function route(app) {

	app.express.get('/:id', (request, response, next) => {
		app.webservice.task(request.params.id).get({lastres: true}, (error, task) => {
			if (error) {
				return next();
			}
			app.webservice.task(request.params.id).results({}, (webserviceError, results) => {
				if (webserviceError) {
					return next(webserviceError);
				}
				const presentedResults = presentResultList(results.map(presentResult));
				response.render('task', {
					task: presentTask(task),
					results: presentedResults,
					mainResult: task.lastResult || null,
					added: (typeof request.query.added !== 'undefined'),
					running: (typeof request.query.running !== 'undefined'),
					ruleIgnored: (typeof request.query['rule-ignored'] !== 'undefined'),
					ruleUnignored: (typeof request.query['rule-unignored'] !== 'undefined'),
					hasOneResult: (presentedResults.length < 2),
					isTaskPage: true
				});
			});
		});
	});

}
