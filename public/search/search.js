'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search/:id', {
    templateUrl: 'search/search.html',
    controller: 'searchCtrl'
  });
}])

.controller('searchCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
        function($scope, $rootScope, $http, $location, $routeParams) {
  // This object will be filled by the form
  $http.get('/books')
    .success( function(data) {

    })
    .error(function(){
      $rootScope.message = 'An error has occurred. Please try again!';
    });
  // Register the search() function
}]);