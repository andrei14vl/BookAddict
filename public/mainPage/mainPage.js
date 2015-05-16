'use strict';

angular.module('myApp.mainPage', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/mainPage', {
    templateUrl: 'mainPage/mainPage.html',
    controller: 'MainPageCtrl'
  });
}])

.controller('MainPageCtrl', ['$scope', function($scope) {

	$scope.books = [
	{'name': 'Vrajitorul din Oz',
     'description': 'Descriere Oz.',
     'link':'http://www.cineshop.ro/images/cache/T7/P/THE%20WIZARD%20OF%20OZ%20-%20BD.jpg'
 	},
    {'name': 'Momente si schite',
     'description': 'IL Caragiale este unul dintre cei mai apreciati autori.',
     'link':'http://upload.wikimedia.org/wikipedia/commons/e/eb/Ion_Luca_Caragiale_-_Foto03.jpg'
 	},
    {'name': 'Fight club™',
     'description': 'Eliberare.',
     'link':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3C3s45NY4JpnDHMjUusowx2DfUiSPRkF0CGCpupkVNvBS-tzD'
 	}];
}]);