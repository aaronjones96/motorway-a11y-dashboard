//

// jscs:disable maximumLineLength, requireArrowFunctions
'use strict';

const assert = require('proclaim');

describe('GET /<task-id>/delete', function() {

	beforeEach(function(done) {
		const request = {
			method: 'GET',
			endpoint: '/abc000000000000000000001/delete'
		};
		this.navigate(request, done);
	});

	it('should send a 200 status', function() {
		assert.strictEqual(this.last.status, 200);
	});

	it('should have a "Delete URL" form', function() {
		const form = this.last.dom('[data-test=delete-url-form]').eq(0);
		assert.isDefined(form);
		assert.strictEqual(form.attr('action'), '/abc000000000000000000001/delete');
		assert.strictEqual(form.attr('method'), 'post');
	});

	it('should display a link back to the task page', function() {
		assert.greaterThan(this.last.dom('[href="/abc000000000000000000001"]').length, 0);
	});

});

describe('POST /<task-id>/delete', function() {

	beforeEach(function(done) {
		const request = {
			method: 'POST',
			endpoint: '/abc000000000000000000001/delete'
		};
		this.navigate(request, done);
	});

	it('should send a 200 status', function() {
		assert.strictEqual(this.last.status, 200);
	});

	it('should delete the task', function(done) {
		this.webservice.task('abc000000000000000000001').get({}, function(error) {
			assert.strictEqual(error.message, 'Error 404');
			done();
		});
	});

	it('should redirect me to the home page', function() {
		assert.strictEqual(this.last.request.uri.pathname, '/');
	});

	it('should display a success message', function() {
		const alert = this.last.dom('[data-test=alert]').eq(0);
		assert.isDefined(alert);
		assert.match(alert.text(), /been deleted/i);
	});

});
