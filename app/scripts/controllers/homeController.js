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
        'today': todaysRating[0],
        'week': weekRatings
      };

      $scope.$watch('ratings.today.total', function(newValue, oldValue) {
          if (newValue !== oldValue) {
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
          return $scope.ratings.today.total / $scope.ratings.today.quantity;
        } else {
          return '-';
        }
      }

      function getWeeklyPercentage() {
        var weeklyPercentage = [];
        angular.forEach($scope.ratings.week, function(value) {
          this.push({'day': value.$id, 'rating': value.total / value.quantity});
        }, weeklyPercentage);
        return _.merge($scope.weekDays, weeklyPercentage);
      }

      function checkVote() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        var localStorageData = window.localStorage.getItem('lastVote');
        if (localStorageData && localStorageData == date) {
          $scope.hasVoted = true;
        }
      }
      checkVote();
      $rootScope.$on('userHasVoted', checkVote);

    });
