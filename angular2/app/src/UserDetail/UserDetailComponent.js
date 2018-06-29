'use strict';

userApp.component('userDetail', {

	bindings: {
		user: '<'
	},
	
	controller: function UserDetailCtrl($routeParams, UsersService) {

		let vm = this;

		vm.$onInit = function() {
			vm.userLoaded = false;

			vm.user = UsersService.get({
				userId: $routeParams['userId']
			}, function(successResult) {
				// Окей!
				vm.notfoundError = false;
				vm.userLoaded = true;

				vm.activeTab = 0;
				vm.disableControlTab = false;

				console.log(vm.user);
			}, function(errorResult) {
				// Не окей..
				vm.notfoundError = true;
				vm.userLoaded = true;
			});

			vm.user.$promise.then(function(result) {
				//vm.userLoaded = true;
			});
		};

		vm.deleteUser = function(userId) {
			vm.user.$delete({
				userId: userId
			}, function(successResult) {
				// Окей!
				vm.deletionSuccess = true;
			}, function(errorResult) {
				// Не окей..
				vm.deletionError = true;
			});
		}
	},

	templateUrl: './src/UserDetail/UserDetail.html'
});