//

// jscs:disable maximumLineLength, requireArrowFunctions
'use strict';

const assert = require('proclaim');

describe.only('GET /', function() {

	beforeEach(function(done) {
		const request = {
			method: 'GET',
			endpoint: '/'
		};
		this.navigate(request, done);
	});

	it('should send a 200 status', function() {
		assert.strictEqual(this.last.status, 200);
	});

	it('should display an "Add new URL" button', function() {
		const elem = this.last.dom('[data-test=add-task]');
		assert.strictEqual(elem.length, 1);
		assert.strictEqual(elem.eq(0).attr('href'), '/new');
	});

	it('should display all of the expected tasks', function() {
		const tasks = this.last.dom('[data-test=task]');
		assert.strictEqual(tasks.length, 4);
		assert.equal(tasks.eq(0).find('.h3').text(), 'NPG Home');
		assert.equal(tasks.eq(0).find('.h4').text(), 'nature.com');
		assert.equal(tasks.eq(0).find('.h5').text(), '(WCAG2AA)');
		assert.equal(tasks.eq(1).find('.h3').text(), 'NPG Home');
		assert.equal(tasks.eq(1).find('.h4').text(), 'nature.com');
		assert.equal(tasks.eq(1).find('.h5').text(), '(WCAG2AAA)');
		assert.equal(tasks.eq(2).find('.h3').text(), 'Nature News');
		assert.equal(tasks.eq(2).find('.h4').text(), 'nature.com/news');
		assert.equal(tasks.eq(2).find('.h5').text(), '(Section508)');
		assert.equal(tasks.eq(3).find('.h3').text(), 'Z Integration Test');
		assert.equal(tasks.eq(3).find('.h4').text(), 'localhost:8132');
		assert.equal(tasks.eq(3).find('.h5').text(), '(WCAG2AA)');
	});

	it('should have links to each task', function() {
		const tasks = this.last.dom('[data-test=task]');
		assert.strictEqual(tasks.eq(0).find('[href="/abc000000000000000000001"]').length, 1);
		assert.strictEqual(tasks.eq(1).find('[href="/abc000000000000000000002"]').length, 1);
		assert.strictEqual(tasks.eq(2).find('[href="/abc000000000000000000003"]').length, 1);
		assert.strictEqual(tasks.eq(3).find('[href="/abc000000000000000000004"]').length, 1);
	});

	it('should display an "Edit" button for each task', function() {
		const tasks = this.last.dom('[data-test=task]');
		assert.strictEqual(tasks.eq(0).find('[href="/abc000000000000000000001/edit"]').length, 1);
		assert.strictEqual(tasks.eq(1).find('[href="/abc000000000000000000002/edit"]').length, 1);
		assert.strictEqual(tasks.eq(2).find('[href="/abc000000000000000000003/edit"]').length, 1);
		assert.strictEqual(tasks.eq(3).find('[href="/abc000000000000000000004/edit"]').length, 1);
	});

	it('should display a "Delete" button for each task', function() {
		const tasks = this.last.dom('[data-test=task]');
		assert.strictEqual(tasks.eq(0).find('[href="/abc000000000000000000001/delete"]').length, 1);
		assert.strictEqual(tasks.eq(1).find('[href="/abc000000000000000000002/delete"]').length, 1);
		assert.strictEqual(tasks.eq(2).find('[href="/abc000000000000000000003/delete"]').length, 1);
		assert.strictEqual(tasks.eq(3).find('[href="/abc000000000000000000004/delete"]').length, 1);
	});

	it('should display a "Run" button for each task', function() {
		const tasks = this.last.dom('[data-test=task]');
		assert.strictEqual(tasks.eq(0).find('[href="/abc000000000000000000001/run"]').length, 1);
		assert.strictEqual(tasks.eq(1).find('[href="/abc000000000000000000002/run"]').length, 1);
		assert.strictEqual(tasks.eq(2).find('[href="/abc000000000000000000003/run"]').length, 1);
		assert.strictEqual(tasks.eq(3).find('[href="/abc000000000000000000004/run"]').length, 1);
	});

	it('should display the task result counts if the task has been run', function() {
		const tasks = this.last.dom('[data-test=task]');
		assert.match(tasks.eq(0).text(), /1\s*errors/i);
		assert.match(tasks.eq(0).text(), /2\s*warnings/i);
		assert.match(tasks.eq(0).text(), /3\s*notices/i);
	});

	it('should display a message indicating that there are no results if the task has not been run', function() {
		const tasks = this.last.dom('[data-test=task]');
		assert.match(tasks.eq(2).text(), /no results/i);
	});

	it('should not display an alert message', function() {
		assert.strictEqual(this.last.dom('[data-test=alert]').length, 0);
	});

});
