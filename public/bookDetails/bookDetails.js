'use strict';

angular.module('myApp.bookDetails', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/bookDetails/:id', {
    templateUrl: 'bookDetails/bookDetails.html',
    controller: 'BookDetailsCtrl'
  });
}])

.controller('BookDetailsCtrl', ['$scope','$http', '$routeParams','$rootScope', function($scope, $http, $routeParams, $rootScope) {

    $http.get('/books/book/'+$routeParams.id)
        .success(function(data) {
            $scope.book = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.readBook = function(){
        $http.post('/readBooks/', {
            bookId : $routeParams.id
        })
            .success(function(data) {
                $rootScope.message = "Succesfully added to your read books list!";
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    }

    $scope.addToWishList = function(){
        $http.post('/wishlist/', {
            bookId : $routeParams.id
        })
            .success(function(data) {
                $rootScope.message = "Succesfully added to your wishlist!";
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    }

    $scope.addReview = function(){
        $http.post('/reviews/', {
            bookId : $routeParams.id,
            complexRelationships: $scope.complexRelationships,
            misteryAndSuspicion: $scope.misteryAndSuspicion,
            beautifulLanguage: $scope.beautifulLanguage,
            intriguingCharacters: $scope.intriguingCharacters,
            immersiveStorylines: $scope.immersiveStorylines,
            text: $scope.comment
        })
            .success(function(data) {
                $rootScope.message = "Succesfully added!";
                $scope.getReviews();
            })
            .error(function(data) {
                console.log('Error: ' + data);
        });
    }


    $scope.getReviews = function(){
        $http.get('/reviews/book/' + $routeParams.id)
        .success(function(data) {
            $scope.reviews = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

    $scope.getReviews();
}]);