'use strict';

angular.module('myApp.userProfile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userProfile', {
    templateUrl: 'userProfile/userProfile.html',
    controller: 'UserProfileCtrl'
  });
}])

.controller('UserProfileCtrl', ['$scope','$http', function($scope, $http) {

    $http.get('/genres')
        .success(function(data) {
            for(var genre in data)
            {
                var doc = document.getElementById("genres");
                var input = document.createElement("input");
                var name = document.createElement("label");
                input.type = "checkbox";
                input.id = data[genre].name;
                name.innerHTML = data[genre].name;
                name.htmlFor = data[genre].name;
                doc.appendChild(input);
                doc.appendChild(name);
                doc.appendChild(document.createElement("br"));
            }
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    
}]);