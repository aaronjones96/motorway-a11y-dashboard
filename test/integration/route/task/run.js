//

// jscs:disable maximumLineLength, requireArrowFunctions
'use strict';

const assert = require('proclaim');

describe('GET /<task-id>/run', function() {

	beforeEach(function(done) {
		const request = {
			method: 'GET',
			endpoint: '/abc000000000000000000001/run'
		};
		this.navigate(request, done);
	});

	it('should send a 200 status', function() {
		assert.strictEqual(this.last.status, 200);
	});

	it('should redirect me to the task page', function() {
		assert.strictEqual(this.last.request.uri.pathname, '/abc000000000000000000001');
	});

	it('should display a success message', function() {
		const alert = this.last.dom('[data-test=alert]').eq(0);
		assert.isDefined(alert);
		assert.match(alert.text(), /new results are being generated/i);
	});

});
