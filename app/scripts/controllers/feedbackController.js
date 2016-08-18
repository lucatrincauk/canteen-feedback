'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.controller:FeedbackController
 * @description
 * # FeedbackController
 */
angular.module('CanteenFeedback')
    .controller('FeedbackController', function($rootScope, $scope, feedbacks, Ratings, $state, User) {

      $scope.feedbacks = feedbacks;
      $scope.ratings = Ratings.getTodaysRating();
      $scope.newFeedback = {};

      if (User.checkUserVote()) {
        $state.go('app.home');
      }

      var registerVote = function() {
        User.registerUserVote();
      };

      $scope.addFeedback = function() {
        Ratings.addRating($scope.total);
        $scope.feedbacks.$add($scope.newFeedback);
        registerVote();
        $state.go('app.home');
      };

      $scope.calculateTotal = function() {

          if ($scope.newFeedback.rating >= 0 && $scope.newFeedback.staff >= 0 && $scope.newFeedback.portion >= 0 && $scope.newFeedback.money >= 0) {
            $scope.newFeedback = {
              'option': $scope.newFeedback.option,
              'rating': parseFloat($scope.newFeedback.rating),
              'staff': parseFloat($scope.newFeedback.staff),
              'portion': parseFloat($scope.newFeedback.portion),
              'money': parseFloat($scope.newFeedback.money)
            }

          $scope.total = ($scope.newFeedback.rating*2 + $scope.newFeedback.staff + $scope.newFeedback.portion + $scope.newFeedback.money)*10/25;
        }
      };


    });
