'use strict';

/**
 * @ngdoc function
 * @name CanteenFeedback.controller:FeedbackController
 * @description
 * # FeedbackController
 */
angular.module('CanteenFeedback')
    .controller('SingleFeedbackController', function($scope, feedbacks, Ratings, $state, Feedbacks, Dates) {

      $scope.feedbacks = feedbacks;
      $scope.count = _.countBy(feedbacks, 'option');
      $scope.pieKeys = _.keys($scope.count);
      $scope.pieValues = _.values($scope.count);

      $scope.valueTotal = [[(_.sumBy($scope.feedbacks, 'rating')/($scope.feedbacks.length)).toFixed(1),(_.sumBy($scope.feedbacks, 'staff')/$scope.feedbacks.length).toFixed(1),(_.sumBy($scope.feedbacks, 'portion')/$scope.feedbacks.length).toFixed(1),(_.sumBy($scope.feedbacks, 'money')/$scope.feedbacks.length).toFixed(1)]];
      $scope.labels = ['Taste', 'Staff', 'Portion', 'Value'];

      $scope.date = $state.params.id;

      $scope.feedbacksByOption = Feedbacks.getFeedbacksByOption($scope.feedbacks);

      var calculateRatings = function() {
        $scope.ratings = [];
        _.forEach($scope.pieKeys, function(key) {
          // $scope.ratings[key] = Feedbacks.getFeedbacksRating($scope.feedbacksByOption[key]);
          $scope.ratings.push({
            'title': key,
            'rating': Feedbacks.getFeedbacksRating($scope.feedbacksByOption[key])
          });
        });
      };

      calculateRatings();

      $scope.$watch(feedbacks, function(newValue, oldValue) {
        if (newValue !== oldValue) {
            calculateRatings();
        }
      });

      $scope.stats = {
        'best': _.maxBy($scope.ratings, 'rating'),
        'popular': _.max(Object.keys($scope.count), function (o) {
          return $scope.count[o];
        })
      };

      $scope.todaysRating = Ratings.getDateRating($scope.date);


      if ($scope.date === Dates.formatDate(Dates.getTodaysDate())) {
        $scope.isTodaysDate = true;
      }

});
