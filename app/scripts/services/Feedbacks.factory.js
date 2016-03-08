'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.service:Feedbacks
 */
angular.module('CanteenFeedback')
  .factory('Feedbacks', function($firebaseArray, FirebaseUrl, Dates) {

    var ref = new Firebase(FirebaseUrl);
    var getTodaysFeedbacks = function() {
      return $firebaseArray(ref.child('feedbacks').child(Dates.formatDate(Dates.getTodaysDate())));
    };

    var getWeekFeedbacks = function() {
      var week = Dates.getCurrentWeekDays(true);

      return $firebaseArray(ref.child('feedbacks').orderByKey().startAt(Dates.formatDate(week[0].day)).endAt(Dates.formatDate(week[4].day)));
    };


    var feedbacks = {
      getTodaysFeedbacks: getTodaysFeedbacks,
      getWeekFeedbacks: getWeekFeedbacks
    };

    return feedbacks;

  });
