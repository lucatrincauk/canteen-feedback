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
      $scope.weekDays = Dates.getCurrentWeekDays(true);
      $scope.weekDaysUnformatted = Dates.getCurrentWeekDays();
      $scope.ratings = {
        'today': todaysRating[0],
        'week': weekRatings
      };

      var dailyPercentage = getDailyPercentage();
      var weeklyPercentage = getWeeklyPercentage();
      $scope.dailyPercentage = dailyPercentage;
      $scope.weeklyPercentage = weeklyPercentage;

      function getDailyPercentage() {
        return $scope.ratings.today.positive / $scope.ratings.today.total * 10;
      }

      function getWeeklyPercentage() {
        var weeklyPercentage = [];
        angular.forEach($scope.ratings.week, function(value, key) {
          this.push({'day': value.$id, 'rating': value.positive / value.total * 10});
        }, weeklyPercentage);
        return _.merge($scope.weekDays, weeklyPercentage);
      }

    });
