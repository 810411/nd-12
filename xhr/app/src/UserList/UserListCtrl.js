'use strict';

userApp.controller('UserListCtrl', function ($scope, UsersService, PostsService, $q) {
  $scope.usersLoader = true;
  $scope.postsLoader = true;

  const usersPromise = UsersService.getUsers();
  const postsPromise = PostsService.getPosts();

  $q.all([usersPromise, postsPromise]).then(function (response) {
    $scope.users = response[0].data;
    $scope.posts = response[1].data;
    $scope.usersLoader = false;
    $scope.postsLoader = false;
  });

  /*   UsersService.getUsers().then(function (response) {
      $scope.users = response.data
      return PostsService.getPosts()
    }).then(function (response) {
      $scope.posts = response.data
    }) */

});