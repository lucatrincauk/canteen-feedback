'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.controller:HomeController
 * @description
 * # HomeController
 */
angular.module('CanteenFeedback')
    .controller('HomeController', function($scope, weekFeedbacks, todaysFeedbacks, _, Dates, weekRatings, todaysRating, $rootScope) {

      $scope.feedbacks = weekFeedbacks;
      $scope.todaysFeedbacks = todaysFeedbacks;
      $scope.weekDays = Dates.getCurrentWeekDays(true);
      $scope.weekDaysUnformatted = Dates.getCurrentWeekDays();
      $scope.todaysDate = Dates.getTodaysDate();
      $scope.ratings = {
        'today': todaysRating,
        'week': weekRatings
      };

      $scope.$watch('ratings.today[0].quantity', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.weeklyPercentage = getWeeklyPercentage();
          }
      });

      var weeklyPercentage = getWeeklyPercentage();
      $scope.weeklyPercentage = weeklyPercentage;

      function getWeeklyPercentage() {
        for (var day in $scope.weekDays) {
          for (var rating in $scope.ratings.week) {
            if($scope.weekDays.hasOwnProperty(day) && $scope.ratings.week.hasOwnProperty(rating) && $scope.ratings.week[rating]!== null && $scope.weekDays[day]!== null && $scope.ratings.week[rating].$id === $scope.weekDays[day].$id) {
              $scope.weekDays[day] = $scope.ratings.week[rating];
              $scope.weekDays[day].rating = $scope.weekDays[day].total / $scope.weekDays[day].quantity;
            }
          }
        }
        return $scope.weekDays;
      }

    });
