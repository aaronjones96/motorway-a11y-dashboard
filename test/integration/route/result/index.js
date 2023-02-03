//

// jscs:disable maximumLineLength, requireArrowFunctions
'use strict';

const assert = require('proclaim');

describe('GET /<task-id>/<result-id>', function() {

	beforeEach(function(done) {
		const request = {
			method: 'GET',
			endpoint: '/abc000000000000000000001/def000000000000000000001'
		};
		this.navigate(request, done);
	});

	it('should send a 200 status', function() {
		assert.strictEqual(this.last.status, 200);
	});

	it('should display a "Download CSV" button', function() {
		const elem = this.last.dom('[data-test=download-csv]');
		assert.strictEqual(elem.length, 1);
		assert.strictEqual(elem.eq(0).attr('href'), '/abc000000000000000000001/def000000000000000000001.csv');
	});

	it('should display a "Download JSON" button', function() {
		const elem = this.last.dom('[data-test=download-json]');
		assert.strictEqual(elem.length, 1);
		assert.strictEqual(elem.eq(0).attr('href'), '/abc000000000000000000001/def000000000000000000001.json');
	});

	it('should display a link back to the task', function() {
		assert.isDefined(this.last.dom('[href="/abc000000000000000000001"]').eq(0));
	});

	it('should display errors', function() {
		const elem = this.last.dom('[data-test=task-errors]').eq(0);
		assert.isDefined(elem);
		assert.match(elem.text(), /errors \( 1 \)/i);
	});

	it('should display warnings', function() {
		const elem = this.last.dom('[data-test=task-warnings]').eq(0);
		assert.isDefined(elem);
		assert.match(elem.text(), /warnings \( 2 \)/i);
	});

	it('should display notices', function() {
		const elem = this.last.dom('[data-test=task-notices]').eq(0);
		assert.isDefined(elem);
		assert.match(elem.text(), /notices \( 3 \)/i);
	});

});
