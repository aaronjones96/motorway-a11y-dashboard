//
'use strict';

module.exports = route;

// Route definition
function route(app) {

	app.express.get('/:id/run', (request, response, next) => {
		app.webservice.task(request.params.id).run(error => {
			if (error) {
				return next();
			}
			response.redirect(`/${request.params.id}?running`);
		});
	});

}
