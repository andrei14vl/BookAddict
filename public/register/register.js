'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'registerCtrl'
  });
}])

.controller('registerCtrl', ['$scope', '$rootScope', '$http', '$location',
        function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the register() function
  $scope.register = function(){
    $http.post('/users', {
      email: $scope.user.email,
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Register successful! Please log in.';
      $location.url('/login');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Register failed. Please try again.';
      $location.url('/register');
    });
  };
}]);