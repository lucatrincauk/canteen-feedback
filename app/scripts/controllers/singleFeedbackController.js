'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.controller:FeedbackController
 * @description
 * # FeedbackController
 */
angular.module('CanteenFeedback')
    .controller('SingleFeedbackController', function($scope, feedbacks, Ratings, $state) {

      $scope.feedbacks = feedbacks;
      $scope.count = _.countBy($scope.feedbacks, 'option');
      $scope.pieKeys = _.keys($scope.count);
      $scope.pieValues = _.values($scope.count);

      $scope.valueTotal = [[(_.sumBy($scope.feedbacks, 'rating')/($scope.feedbacks.length)).toFixed(1),(_.sumBy($scope.feedbacks, 'staff')/$scope.feedbacks.length).toFixed(1),(_.sumBy($scope.feedbacks, 'portion')/$scope.feedbacks.length).toFixed(1),(_.sumBy($scope.feedbacks, 'money')/$scope.feedbacks.length).toFixed(1)]];


      $scope.labels = ['Rating', 'Staff', 'Portion', 'Value'];

      $scope.date = $state.params.id;


    });
