angular
  .module('UserApp')
  .factory('UsersService', ($resource) => {
    return $resource('https://jsonplaceholder.typicode.com/users/:userId/', {
      userId: '@userId'
    }, {
      update: {
        method: 'PUT'
      }
    })
  })
