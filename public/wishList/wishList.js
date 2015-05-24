'use strict';

angular.module('myApp.wishList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wishList', {
    templateUrl: 'wishList/wishList.html',
    controller: 'WishListCtrl'
  });
}])

.controller('WishListCtrl', ['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {

    $scope.getWishlist = function() { $http.get('/wishlist/user/' + $rootScope.currentUser.id)
        .success(function(data) {
            $scope.books = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    }
    $scope.getWishlist();
    $scope.remove = function($bookId){
        $http.delete('/wishlist/'+$bookId)
            .success(function(data) {
            $scope.getWishlist();    
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    }
}]);