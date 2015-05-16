'use strict';

angular.module('myApp.wishList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wishList', {
    templateUrl: 'wishList/wishList.html',
    controller: 'WishListCtrl'
  });
}])

.controller('WishListCtrl', ['$scope','$http', function($scope, $http) {

    $http.get('/books')
        .success(function(data) {
            $scope.books = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}]);