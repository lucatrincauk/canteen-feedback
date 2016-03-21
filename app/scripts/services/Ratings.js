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

    var getWeekRatings = function() {
      var week = Dates.getCurrentWeekDays(true);

      return $firebaseArray(ref.child('ratings').orderByKey().startAt(Dates.formatDate(week[0].day)).endAt(Dates.formatDate(week[4].day)));
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
      getWeekRatings: getWeekRatings,
      addRating: addRating
    };

    return ratings;

  });
