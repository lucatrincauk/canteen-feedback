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
      console.log($scope.pieKeys, $scope.pieValues)

      $scope.labels0 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
      $scope.data0 = [300, 500, 100];


      $scope.valueTotal = [[_.sumBy($scope.feedbacks, 'rating')/($scope.feedbacks.length),_.sumBy($scope.feedbacks, 'staff')/$scope.feedbacks.length,_.sumBy($scope.feedbacks, 'portion')/$scope.feedbacks.length,_.sumBy($scope.feedbacks, 'money')/$scope.feedbacks.length]];


      $scope.labels = ['Rating', 'Staff', 'Portion', 'Value'];

      $scope.date = $state.params.id;
      console.log($scope.valueTotal[0])


    });
