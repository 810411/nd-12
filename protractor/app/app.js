'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'ngMessages'
]).
config(function($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.when('', '/home');
	  $urlRouterProvider.when('/', '/home');

    $stateProvider
        .state({
            name: 'home',
            url: '/home',
            templateUrl: 'HomeComponent/HomeComponent.html',
            controller: function() {}
        })
        .state({
            name: 'myaccount',
            url: '/myaccount',
            templateUrl: 'AccountComponent/AccountComponent.html',
            // controller: 'AccountComponent as vm'
        })
        .state({
            name: 'list',
            url: '/list',
            templateUrl: 'PokemonList/PokemonList.html',
            controller: 'PokemonListCtrl as vm'
        })
        .state({
            name: 'new',
            url: '/new',
            templateUrl: 'CreatePokemon/CreatePokemon.html',
            controller: 'CreatePokemonCtrl as vm'
        })
        .state({
            name: 'detail',
            url: '/pokemons/:pokemonId',
            templateUrl: 'PokemonDetail/PokemonDetail.html',
            controller: 'PokemonDetailCtrl as vm'
        }).state({
            name: 'detail.edit',
            url: '/edit',
            parent: 'detail',
            templateUrl: 'PokemonDetail/PokemonDetailEdit.html',
            controller: function() {}
        });

});