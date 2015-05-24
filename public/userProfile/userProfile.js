'use strict';

angular.module('myApp.userProfile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userProfile', {
    templateUrl: 'userProfile/userProfile.html',
    controller: 'UserProfileCtrl'
  });
}])

.controller('UserProfileCtrl', ['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {

    $http.get('/genres')
        .success(function(data) {
            $scope.categories = data;

            for(var cat = 0; cat != $scope.categories.length; cat++){
                $scope.categories[cat].checked = false;
            }

            $http.get('genres/user')
               .success(function(data) {
                    $scope.checked = data;

                    for(var ckd = 0; ckd != $scope.checked.length; ckd++){
                        for(var cat = 0; cat != $scope.categories.length; cat++){
                            if($scope.categories[cat].name == $scope.checked[ckd].name)
                                $scope.categories[cat].checked = true;
                        }
                    }

                })
                .error(function(data) {
                    console.log('Error: ' + data);
            });
        })
        .error(function(data) {
            console.log('Error: ' + data);
    });
    
    
    var updateSelected = function(action, id) {
        if (action == 'add') {

            $http.post('/genres/', {
                genreId : id 
            })
                .success(function(data) {
                })
                .error(function(data) {
                    console.log('Error: ' + data);
            });
        }
        if (action == 'remove') {

            $http.delete('/genres/' + id, {
            })
                .success(function(data) {
            })
                .error(function(data) {
                    console.log('Error: ' + data);
            });
        }
    };

    $scope.updateCategory = function(id, checked) {

        var action = (checked ? 'add' : 'remove');
        updateSelected(action, id);
    };

    $http.get('/readbooks/user/' + $rootScope.currentUser.id)
        .success(function(data) {
            $scope.books = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.getPreferences = function() {
        $http.get('preferences')
               .success(function(data) {
                    $scope.misteryAndSuspicion = data.misteryAndSuspicion;
                    $scope.beautifulLanguage = data.beautifulLanguage;
                    $scope.complexRelationships = data.complexRelationships;
                    $scope.intriguingCharacters = data.intriguingCharacters;
                    $scope.immersiveStorylines = immersiveStorylines;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
            });
    }

    $scope.getPreferences();

    $scope.savePreferences = function() {

            $http.post('/preferences/', {
                misteryAndSuspicion: $scope.misteryAndSuspicion,
                beautifulLanguage: $scope.beautifulLanguage,
                complexRelationships: $scope.complexRelationships,
                intriguingCharacters: $scope.intriguingCharacters,
                immersiveStorylines: $scope.immersiveStorylines
            })
                .success(function(data) {
                })
                .error(function(data) {
                    console.log('Error: ' + data);
            });
    }

}]);