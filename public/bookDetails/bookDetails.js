'use strict';

angular.module('myApp.bookDetails', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bookDetails/:id', {
    templateUrl: 'bookDetails/bookDetails.html',
    controller: 'BookDetailsCtrl'
  });
}])

.controller('BookDetailsCtrl', ['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {

    $http.get('/books/book/'+$routeParams.id)
        .success(function(data) {
            $scope.book = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}]);