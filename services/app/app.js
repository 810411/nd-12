'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'ngMessages'
]).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state({
      name: 'header',
      url: '',
      templateUrl: 'MainMenu/MainMenu.html',
      controller: 'MainMenuCtrl as vm'
    })
    .state({
      name: 'list',
      url: '/list',
      parent: 'header',
      templateUrl: 'PokemonList/PokemonList.html',
      controller: 'PokemonListCtrl as vm'
    })
    .state({
      name: 'createNewPokemon',
      url: '/new',
      parent: 'header',
      templateUrl: 'CreatePokemon/CreatePokemon.html',
      controller: 'CreatePokemonCtrl as vm'
    })
    .state({
      name: 'detail',
      url: '/pokemons/:pokemonId',
      templateUrl: 'PokemonDetail/PokemonDetail.html',
      controller: 'PokemonDetailCtrl as vm'
    })
    .state({
      name: 'detail.edit',
      url: '/edit',
      parent: 'detail',
      templateUrl: 'PokemonDetail/PokemonDetailEdit.html',
      controller: function () {
      }
    })
    .state({
      name: 'myAccount',
      url: '/myaccount',
      parent: 'header',
      templateUrl: 'MyAccount/MyAccount.html',
      controller: 'MyAccountCtrl as vm'
    });
});