describe('PokemonList controller: ', function () {
	let ctrl, PokemonService, $httpBackend, $scope, $q;

	beforeEach(module('myApp'));

	beforeEach(inject(function($controller, $rootScope, _$q_, _$httpBackend_, _PokemonService_) {
		ctrl = $controller; //('PokemonListCtrl', {$scope: $scope, PokemonService: _PokemonService_});
		$scope = $rootScope.$new();
		PokemonService = _PokemonService_;
		$q = _$q_;
		$httpBackend = _$httpBackend_;
		$httpBackend.whenGET('HomeComponent/HomeComponent.html').respond(200, '');
	}));

	afterEach(function() {
		$httpBackend.flush();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('Controller should have the same data as in Service method', function () {

		let handler = sinon.stub(),
			response = {
			data: [
				{name: 'test1', id: 1},
				{name: 'test2', id: 2},
				{name: 'test5', id: 5},
				{name: 'test10', id: 10}
				]
			},
			stub = sinon.stub(PokemonService, 'getPokemons').returns($q.when(response));

		let vm = ctrl('PokemonListCtrl', {
			$scope: $scope,
			PokemonService: PokemonService
		});

		$scope.$apply();

		chai.expect(vm).to.not.equal(undefined);
		chai.expect(vm.pokemons).to.equal(response.data);
		chai.expect(vm.pokemons).to.not.equal({name: 'test', id: 0});
	});
});