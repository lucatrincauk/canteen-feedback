'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.service:Ratings
 */
angular.module('CanteenFeedback')
  .factory('Ratings', function($firebaseArray, FirebaseUrl, Dates) {

    var ref = new Firebase(FirebaseUrl);

    var getTodaysRating = function() {
      return $firebaseArray(ref.child('ratings').orderByKey().equalTo(Dates.formatDate(Dates.getTodaysDate())));
    };

    var getDateRating = function(day) {
      return $firebaseArray(ref.child('ratings').orderByKey().equalTo(day));
    };

    var getWeekRatings = function() {
      var week = Dates.getCurrentWeekDays(true);

      return $firebaseArray(ref.child('ratings').orderByKey().startAt(Dates.formatDate(week[0].$id)).endAt(Dates.formatDate(week[4].$id)));
    };

    var addRating = function(rating) {
      ref.child('ratings').child(Dates.formatDate(Dates.getTodaysDate())).transaction(function(current) {
        if (current === null) {
          current = {
            total: 0,
            quantity: 0
          };
        }
        return {'total': current.total + rating, 'quantity': current.quantity + 1 };
      });
    };

    var ratings = {
      getTodaysRating: getTodaysRating,
      getDateRating: getDateRating,
      getWeekRatings: getWeekRatings,
      addRating: addRating
    };

    return ratings;

  });
