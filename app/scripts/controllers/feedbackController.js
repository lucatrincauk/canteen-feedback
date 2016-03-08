'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.controller:FeedbackController
 * @description
 * # FeedbackController
 */
angular.module('CanteenFeedback')
    .controller('FeedbackController', function($scope, feedbacks, Ratings) {

      $scope.feedbacks = feedbacks;
      $scope.ratings = Ratings.getTodaysRating();
      $scope.newFeedback = {
        choice: ''
      };


      $scope.addFeedback = function() {
        Ratings.addRating($scope.newFeedback.choice === 'happy' ? true : false);
        $scope.feedbacks.$add($scope.newFeedback).then(function(){
          $scope.newFeedback = {
            choice: ''
          };
        });

      };


    });
