'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.service:Feedbacks
 */
angular.module('CanteenFeedback')
  .factory('Dates', function() {
    var date;

    function currentMonth(date) {
      date = date.slice(0, 7);

      var month = {
          'start': date + '-01',
          'end': date + '-31'
      };

      return month;
    }

    function getTodaysDate() {
      return new Date().toJSON();
    }

    function getCurrentWeekDays(shortenDate) {
      date =  new Date();
      var range = [],
          day = date.getDay(),
          diffStart = date.getDate() - day + (day === 0 ? -6 : 1);

      for (var i = 0; i < 5; i++) {
        date = new Date();
        if (shortenDate) {
          range.push({'day':formatDate(new Date(date.setDate(diffStart + i)).toJSON())});
        } else {
          range.push(new Date(date.setDate(diffStart + i)).toJSON());
        }
      }

      return range;
    }

    function formatDate(date) {
      return date.slice(0,10);
    }


    var dates = {
      getCurrentWeekDays: getCurrentWeekDays,
      getTodaysDate: getTodaysDate,
      formatDate: formatDate
    };

    return dates;

  });
