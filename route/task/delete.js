//
'use strict';

const presentTask = require('../../view/presenter/task');

module.exports = route;

// Route definition
function route(app) {

	app.express.get('/:id/delete', (request, response, next) => {
		app.webservice.task(request.params.id).get({}, (error, task) => {
			if (error) {
				return next();
			}
			response.render('task/delete', {
				task: presentTask(task),
				isTaskSubPage: true
			});
		});
	});

	app.express.post('/:id/delete', (request, response, next) => {
		app.webservice.task(request.params.id).remove(error => {
			if (error) {
				return next();
			}
			response.redirect('/?deleted');
		});
	});

}
