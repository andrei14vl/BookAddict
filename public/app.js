'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.mainPage',
  'myApp.view2',
  'myApp.version',
  'myApp.login',
  'myApp.register'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])
 .run(function($rootScope, $http){
    $rootScope.message = '';
    
    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/logout');
    };
 });
