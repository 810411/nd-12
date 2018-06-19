'use strict';

angular
  .module('myApp')
  .controller('MainMenuCtrl', function () {

    let vm = this;

    vm.menuList = [
      {
        sref: 'list',
        text: 'Список'
      },
      {
        sref: 'createNewPokemon',
        text: 'Добавить нового'
      },
      {
        sref: 'myAccount',
        text: 'Мой аккаунт'
      }
    ];
  });
