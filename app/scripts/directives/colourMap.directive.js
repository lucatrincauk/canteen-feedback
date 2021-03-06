'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.directive:ColourMap
 * @description
 * # ColourMap
 */
angular.module('CanteenFeedback')
  .directive('colourMap', function() {

    return {
      restrict: 'AE',
      scope: {
        value: '=colourMap',
        scale: '=colourMapScale'
      },
      template: '<div class="coloured-col" ng-style="{\'background-color\': \'rgb(\' + red + \',\' + green + \', 100)\'}">{{value >= 0 ? (value | number : 1) : "—"}}<span ng-if="scale">/10</span></div>',
      link: link
    };

    function link(scope) {
      scope.$watch('value', function(newValue, oldValue) {
        if (newValue !== oldValue) {
          scope.mapColours();
        }
      });


      scope.mapColours = function() {
        if (scope.value >= 0) {
          scope.green = Math.round(Math.min((255.0 * 2.0) * (scope.value / (11 - 1)), 255));
          scope.red = Math.round(Math.min((255.0 * 2.0) * ((11 - 1 - scope.value) / (11 - 1))));
        }
      };

      scope.mapColours();


    }
  });
