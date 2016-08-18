'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.service:User
 */
angular.module('CanteenFeedback')
  .factory('User', function($rootScope) {

    var checkUserVote = function() {
      var date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      var localStorageData = window.localStorage.getItem('lastVote');
      if (localStorageData && localStorageData == date) {
        setUserVote(true);
      }

      return localStorageData && localStorageData == date;
    }

    var registerUserVote = function () {
      var date = new Date();
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      try {
        window.localStorage.setItem('lastVote', date);
      } catch (e) {
        return false;
      }
      setUserVote(true);
    }

    var setUserVote = function(hasVoted) {
      $rootScope.userHasVoted = hasVoted;
    }

    var user = {
      checkUserVote: checkUserVote,
      registerUserVote: registerUserVote,
      setUserVote: setUserVote
    };

    return user;

  });
