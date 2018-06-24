angular
  .module('UserApp')
  .factory('PostsService',
   ($resource) => {
     return $resource('https://jsonplaceholder.typicode.com/posts:postId',
      {
        postId: '@postId'
      }
    );
   }
  );
