'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.mainPage',
  'myApp.userProfile',
  'myApp.bookDetails',
  'myApp.wishList',
  'myApp.version',
  'myApp.login',
  'myApp.register',
  'myApp.search',
  'myApp.starRating'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
 
}])
 .run(function($q, $timeout, $http, $location, $rootScope){
 	 $rootScope.checkLoggedIn = function(){
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user){
        // Authenticated
        if (user !== '0'){
      	  $rootScope.currentUser = user;
          deferred.resolve();

        // Not Authenticated
        } else {
          $rootScope.currentUser = { username : 'Guest'};
          $rootScope.message = 'You need to log in.';
          deferred.reject();
          $location.url('/login');
        }
      })
      .error(function(){
          $rootScope.currentUser = { username : 'Guest'};
      	  $rootScope.message = 'You need to log in.';
          deferred.reject();
          $location.url('/login');
      });

      return deferred.promise;
    };
    $rootScope.message = '';
    $rootScope.checkLoggedIn();
    $rootScope.currentUser = {name: 'Guest'};

    // Logout function is available in any pages
    $rootScope.logout = function(){
      $rootScope.message = 'Logged out.';
      $http.post('/logout').then($rootScope.checkLoggedIn);
    };

    $rootScope.runSearch = function(){
    	$location.url('/search/' + $rootScope.searchText);
    }
 });
