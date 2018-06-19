'use strict';

angular
  .module('myApp')
  .factory('UserService', function() {

    const state = {
      user: {}
    };

    return {
      getUser()  {
        return state.user;
      },
      addUser(item) {
        state.user = {
          name: item.name,
          email: item.email,
          phone: item.phone
        };
        console.log(state.user);
      },
      removeUser() {
        state.user = {};
      }
    };

  });
