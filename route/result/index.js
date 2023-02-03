//
'use strict';

const presentTask = require('../../view/presenter/task');
const presentResult = require('../../view/presenter/result');

module.exports = route;

// Route definition
function route(app) {

	app.express.get('/:id/:rid', (request, response, next) => {
		app.webservice.task(request.params.id).get({}, (error, task) => {
			if (error) {
				return next();
			}
			app.webservice
				.task(request.params.id)
				.result(request.params.rid)
				.get({full: true}, (webserviceError, result) => {
					if (webserviceError) {
						return next();
					}
					response.render('result', {
						task: presentTask(task),
						mainResult: presentResult(result),
						isResultPage: true
					});
				});
		});
	});

}
