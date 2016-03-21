'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.controller:FeedbackController
 * @description
 * # FeedbackController
 */
angular.module('CanteenFeedback')
    .controller('FeedbackController', function($scope, feedbacks, Ratings, $state) {

      $scope.feedbacks = feedbacks;
      $scope.ratings = Ratings.getTodaysRating();
      $scope.newFeedback = {};

      var registerVote = function() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        window.localStorage.setItem('lastVote', date);
        console.log(window.localStorage.lastVote);
        $scope.$emit('userHasVoted');
      };

      $scope.addFeedback = function() {
        Ratings.addRating($scope.total);
        $scope.feedbacks.$add($scope.newFeedback);
        registerVote();
        $state.go('app.home');
      };

      $scope.calculateTotal = function() {
        if ($scope.newFeedback.rating && $scope.newFeedback.staff && $scope.newFeedback.portion && $scope.newFeedback.money) {
          $scope.total = ((parseInt($scope.newFeedback.rating) || 0) + (parseInt($scope.newFeedback.staff) || 0) + (parseInt($scope.newFeedback.portion) || 0) + (parseInt($scope.newFeedback.money) || 0))*10/25;
        }
      };

    });
