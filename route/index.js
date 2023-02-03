//
'use strict';

const presentTask = require('../view/presenter/task');

module.exports = route;

// Route definition
function route(app) {
	app.express.get('/', (request, response, next) => {
		app.webservice.tasks.get({lastres: true}, (error, tasks) => {
			if (error) {
				return next(error);
			}
			response.render('index', {
				tasks: tasks.map(presentTask),
				deleted: (typeof request.query.deleted !== 'undefined'),
				isHomePage: true
			});
		});
	});
}
