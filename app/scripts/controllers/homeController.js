'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('CanteenFeedback')
    .controller('HomeController', function($scope, weekFeedbacks, todaysFeedbacks, _, Dates, weekRatings, todaysRating) {

      $scope.feedbacks = weekFeedbacks;
      $scope.todaysFeedbacks = todaysFeedbacks;
      $scope.ratings = {
        'today': todaysRating[0],
        'week': weekRatings
      };
      $scope.dailyPercentage = function() {
        return $scope.ratings.today.positive / $scope.ratings.today.total * 10;
      }

      $scope.weeklyPercentage = function() {
        var weeklyPercentage = [];
        angular.forEach($scope.feedbacks, function(value, key) {
          var feedbackSplit = _.countBy(value, function(feedback) {
            if (feedback && feedback.choice) {
              return feedback.choice === 'happy';
            }
          });
          if (!this[value.$id]) {
            this[value.$id] = feedbackSplit.true / (feedbackSplit.true + feedbackSplit.false) * 10;

          }
          // this.push({'day': value.$id, 'rating': feedbackSplit.true / (feedbackSplit.true + feedbackSplit.false) * 10});
        }, weeklyPercentage);
        return weeklyPercentage;
      }

      $scope.weeklyPercentage();
      $scope.weekDays = Dates.getCurrentWeekDays(true);
    });
