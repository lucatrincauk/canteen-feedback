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
      $scope.newFeedback = {
        choice: ''
      };

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
        Ratings.addRating($scope.newFeedback.choice === 'happy' ? true : false);
        $scope.feedbacks.$add($scope.newFeedback).then(function(){
          $scope.newFeedback = {
            choice: ''
          };
        });
        registerVote();
        $state.go('app.home');

      };

    });
