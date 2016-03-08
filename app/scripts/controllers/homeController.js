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
      $scope.todaysDate = Dates.getTodaysDate();
      $scope.ratings = {
        'today': todaysRating[0],
        'week': weekRatings
      };
      console.log($scope.ratings)


      $scope.$watch('ratings.today.total', function(newValue, oldValue) {
          if (newValue) {
            $scope.dailyPercentage = getDailyPercentage();
            $scope.weeklyPercentage = getWeeklyPercentage();
          }
      });

      var dailyPercentage = getDailyPercentage();
      var weeklyPercentage = getWeeklyPercentage();
      $scope.dailyPercentage = dailyPercentage;
      $scope.weeklyPercentage = weeklyPercentage;

      function getDailyPercentage() {
        if ($scope.ratings.today) {
          return $scope.ratings.today.positive / $scope.ratings.today.total * 10;
        } else {
          return '-';
        }
      }

      function getWeeklyPercentage() {
        var weeklyPercentage = [];
        angular.forEach($scope.ratings.week, function(value, key) {
          this.push({'day': value.$id, 'rating': value.positive / value.total * 10});
        }, weeklyPercentage);
        return _.merge($scope.weekDays, weeklyPercentage);
      }

    });
