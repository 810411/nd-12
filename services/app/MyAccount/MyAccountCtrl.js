'use strict';

angular
  .module('myApp')
  .controller('MyAccountCtrl', function (UserService) {

    const vm = this;
    vm.User = {};

    vm.createUser = function (user) {
      UserService.addUser(user);
      vm.User = {};
      vm.myAccount.$setPristine();
      vm.Form = false;
      vm.LoggedIn = true;
    };

    vm.getUser = function () {
      return UserService.getUser();
    };

    if (Object.keys(vm.getUser()).length > 0) {
      vm.Form = false;
      vm.LoggedIn = true;
    } else {
      vm.Form = true;
      vm.LoggedIn = false;
    }

    vm.logOut = function () {
      UserService.removeUser();
      vm.user = {};
      vm.Form = true;
      vm.LoggedIn = false;
    };
  });
