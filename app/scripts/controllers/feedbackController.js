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
        try {
          window.localStorage.setItem('lastVote', date);
        } catch (e) {
          return false;
        }
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

      function checkVote() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var localStorageData = window.localStorage.getItem('lastVote');
        if (localStorageData && localStorageData == date) {
          $state.go('app.home');
        }
      }

      checkVote();
    });
