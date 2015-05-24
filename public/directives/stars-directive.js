// http://angulartutorial.blogspot.com/2014/03/rating-stars-in-angular-js-using.html
'use strict';

angular.module('myApp.starRating', ['ngRoute'])
.directive("starRating", function() {
  return {
    restrict : "EA",
    template : "<ul class='rating' ng-class='{readonly: readonly}'>" +
               "  <li ng-repeat='star in stars' ng-class='star' ng-click='toggle($index)'>" +
               "    <i class='fa fa-star'></i>" + //&#9733
               "  </li>" +
               "</ul>",
    scope : {
      ratingValue : "=ngModel",
      max : "=?", //optional: default is 5
      onratingselected : "&?",
      readonly: "=?"
    },
    link : function(scope, elem, attrs) {
      if( !scope.ratingValue) scope.ratingValue = 5;
      if (scope.max == undefined) { scope.max = 5; }
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : i < scope.ratingValue
          });
        }
      };
      scope.toggle = function(index) {
        if (scope.readonly == undefined || scope.readonly == false){
          scope.ratingValue = index + 1;
          window.setTimeout(function() {
            scope.onratingselected({
            rating: index + 1
          });
          }, 300);
        }
      };
      scope.$watch('ratingValue', function(newVal, oldVal) {
        if (newVal) { updateStars(); }
      });
    }
  };
});