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

      $scope.$watch('ratings.week', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $scope.weeklyPercentage = getWeeklyPercentage();
          }
      });

      var weeklyPercentage = getWeeklyPercentage();
      $scope.weeklyPercentage = weeklyPercentage;


      function getWeeklyPercentage() {
        var weeklyPercentage = [];

        _.forEach($scope.weekDays, function(date) {
          _.forEach($scope.ratings.week, function(rating) {
            if (rating.$id === date.day) {
              weeklyPercentage.push({'day': rating.$id, 'rating': rating.total / rating.quantity});
            } else {
              weeklyPercentage.push({'day': date.day});
            }
          });
        });

        return weeklyPercentage
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
