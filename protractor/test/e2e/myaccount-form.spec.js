const expect = require('chai').expect;
describe('Check form on /myaccount: ', () => {
	let form;
	before(() => {
		browser.get('http://localhost:8000/#!/myaccount');
		form = element(by.css('form[name=accountForm]'));
	});
	it('form is loaded', () => {
		form.isPresent().then(isExists => {
			expect(isExists).to.equal(true);
		});
	});

	it('check required fields', () => {
		let reqs = $$('input:required');
		reqs.each((req, i) => {
			req.sendKeys('###').clear();
			expect((req).getAttribute('class')).eventually.to.contain('ng-invalid-required');
		})
	});
});