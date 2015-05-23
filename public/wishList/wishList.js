'use strict';

angular.module('myApp.wishList', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/wishList', {
    templateUrl: 'wishList/wishList.html',
    controller: 'WishListCtrl'
  });
}])

.controller('WishListCtrl', ['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {

    $http.get('/wishlist/user/' + $rootScope.currentUser.id)
        .success(function(data) {
            $scope.books = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.remove = function($bookId){
        $http.delete('/wishlist/'+$bookId)
            .success(function(data) {
                location.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    }
}]);