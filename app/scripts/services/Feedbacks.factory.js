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

    var getFeedbacksByOption = function(feedbacks) {
      return _.groupBy(feedbacks, 'option');
    };

    var getFeedbacksRating = function(feedbacks) {
      var ratingTotal = 0;
      _.forEach(feedbacks, function(feedback) {
        ratingTotal += feedback.money + feedback.portion + feedback.rating*2 + feedback.staff;
      });
      return ratingTotal / (2.5 * feedbacks.length);
    };

    var getDaysFeedbacks = function(date) {
      return $firebaseArray(ref.child('feedbacks').child(date));
    };

    var getWeekFeedbacks = function() {
      var week = Dates.getCurrentWeekDays(true);

      return $firebaseArray(ref.child('feedbacks').orderByKey().startAt(Dates.formatDate(week[0].$id)).endAt(Dates.formatDate(week[4].$id)));
    };


    var feedbacks = {
      getDaysFeedbacks: getDaysFeedbacks,
      getTodaysFeedbacks: getTodaysFeedbacks,
      getWeekFeedbacks: getWeekFeedbacks,
      getFeedbacksByOption: getFeedbacksByOption,
      getFeedbacksRating: getFeedbacksRating
    };

    return feedbacks;

  });
