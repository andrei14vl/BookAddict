'use strict';

angular.module('myApp.wishList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wishList', {
    templateUrl: 'wishList/wishList.html',
    controller: 'WishListCtrl'
  });
}])

.controller('WishListCtrl', ['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {

    $http.get('/wishlist/' + $rootScope.currentUser.id)
        .success(function(data) {
            $scope.books = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.remove = function($bookId){
        $http.post('/wishlist/remove', {
            bookId : $bookId
        })
            .success(function(data) {
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    }
}]);