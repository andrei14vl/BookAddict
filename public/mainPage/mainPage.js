'use strict';

angular.module('myApp.mainPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mainPage', {
    templateUrl: 'mainPage/mainPage.html',
    controller: 'MainPageCtrl'
  });
}])

.controller('MainPageCtrl', ['$scope','$http', function($scope, $http) {

    $http.get('/recommandation')
        .success(function(data) {
            $scope.books = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}]);