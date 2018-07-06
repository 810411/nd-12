describe('ShoppingCartStore factory: ', function() {
	let ShoppingCartStoreService;

	beforeEach(module('myApp'));

	beforeEach(inject(function(ShoppingCartStore) {
		ShoppingCartStoreService = ShoppingCartStore;
	}));

	it('should add items with ShoppingCartStore.addItem', function() {
		ShoppingCartStoreService.addItem({name: 'test1', id: '1'});
		ShoppingCartStoreService.addItem({name: 'test1', id: '1'});
		ShoppingCartStoreService.addItem({name: 'test2', id: '2'});
		let list = ShoppingCartStoreService.getItems();
		chai.expect(list['1'].quantity).to.equal(2);
		chai.expect(list['2'].quantity).to.equal(1);
	});
});