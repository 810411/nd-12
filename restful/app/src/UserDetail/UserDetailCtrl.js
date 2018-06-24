'use strict'

userApp.controller('UserDetailCtrl', function ($scope, $routeParams, UsersService, PostsService) {
  $scope.userLoaded = false;
  $scope.postsLoaded = false;

  $scope.user = UsersService.get({
    userId: $routeParams['userId']
  }, function (successResult) {
    // Окей!
    console.log(successResult)
    $scope.notfoundError = false
    $scope.userLoaded = true
  }, function (errorResult) {
    // Не окей..
    $scope.notfoundError = true
    $scope.userLoaded = true
  })

  $scope.user.$promise.then(function (result) {
    // $scope.userLoaded = true
  })

  $scope.deleteUser = function (userId) {
    $scope.user.$delete({
      userId: userId
    }, function (successResult) {
      // Окей!
      $scope.deletionSuccess = true
    }, function (errorResult) {
      // Не окей..
      $scope.deletionError = true
    })
  }

  $scope.posts = PostsService.query({
    postId: $routeParams['postId']
  }, (success) => {
    $scope.noPostsError = false;
    $scope.postsLoaded = true;
  }, (error) => {
    $scope.noPostsError = true
    $scope.postsLoaded = true;
  });
});

