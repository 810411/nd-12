const expect = require('chai').expect;
describe('Main menu highlighting: ', function () {
	it('menu item', function () {
		browser.get('http://localhost:8000/#!/home');

		let links = element.all(by.css('a[ui-sref-active=btn-primary]'));

		links.each((elem, i) => {
			elem.getAttribute('ui-sref').then(url => {
				console.log(i, url);
				browser.setLocation(url);
				expect(element(by.css('a[ui-sref=' + url + ']'))
					.getAttribute('class')).eventually.to.contain('btn-primary');
			});
		});
	});
});