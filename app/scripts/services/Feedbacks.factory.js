'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.service:Feedbacks
 */
angular.module('CanteenFeedback')
  .factory('Feedbacks', function($firebaseArray, FirebaseUrl) {



    function dateFormat () {
    	var date = new Date();
    	return date.toJSON().slice(0, 10);
    }

    function currentMonth(date) {
      var date = date.slice(0, 7);

      var month = {
          'start': date + '-01',
          'end': date + '-31'
      };

      return month;
    }

    function currentWeek() {
      var date =  new Date();
      var range = {},
          day = date.getDay(),
          diffStart = date.getDate() - day + (day === 0 ? -6 : 1),
          diffEnd = date.getDate() + 6 + (day === 0 ? -6 : -day + 1);

      range.start = new Date(date.setDate(diffStart)).toJSON();
      date = new Date();
      range.end = new Date(date.setDate(diffEnd)).toJSON();

      return range;
    }

    function formatDate(date) {
      return date.slice(0,10);
    }

    var ref = new Firebase(FirebaseUrl);

    var getTodaysFeedbacks = function() {
      return $firebaseArray(ref.child('feedbacks').child(dateFormat()));
    };

    var getWeekFeedbacks = function() {
      var month = currentMonth(dateFormat());
      var week = currentWeek();

      return $firebaseArray(ref.child('feedbacks').orderByKey().startAt(formatDate(week.start)).endAt(formatDate(week.end)));
    };

    var feedbacks = {
      getTodaysFeedbacks: getTodaysFeedbacks,
      getWeekFeedbacks: getWeekFeedbacks
    }

    return feedbacks;

  });
