'use strict';

/**
 * @ngdoc overview
 * @name CanteenFeedback
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('CanteenFeedback', ['ionic', 'ngCordova', 'ngSanitize', 'firebase', 'chart.js'])

    .run(function($ionicPlatform, User) {

        // $ionicPlatform.ready(function() {
        //     // save to use plugins here
        // });

        User.checkUserVote();
    })
    .constant('FirebaseUrl', 'https://canteen-feedback.firebaseio.com/')

    .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
        // register $http interceptors, if any. e.g.
        // $httpProvider.interceptors.push('interceptor-name');

        // Application routing
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/main.html'
            })
            .state('app.home', {
                url: '/home',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/home.html',
                        controller: 'HomeController'
                    }
                },
                resolve: {
                  weekFeedbacks: function (Feedbacks){
                    return Feedbacks.getWeekFeedbacks().$loaded();
                  },
                  todaysFeedbacks: function (Feedbacks){
                    return Feedbacks.getTodaysFeedbacks().$loaded();
                  },
                  weekRatings: function (Ratings){
                    return Ratings.getWeekRatings().$loaded();
                  },
                  todaysRating: function (Ratings){
                    return Ratings.getTodaysRating().$loaded();
                  }
                }

            })
            .state('app.feedback', {
                url: '/feedback',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/feedback.html',
                        controller: 'FeedbackController'
                    }
                },
                resolve: {
                  feedbacks: function (Feedbacks){
                    return Feedbacks.getTodaysFeedbacks().$loaded();
                  }
                }

            })
            .state('app.dayFeedbacks', {
                url: '/feedbacks/:id',
                cache: true,
                views: {
                    'viewContent': {
                        templateUrl: 'templates/views/dayRating.html',
                        controller: 'SingleFeedbackController'
                    }
                },
                resolve: {
                  feedbacks: function (Feedbacks, $stateParams){
                    console.log($stateParams.id)
                    return Feedbacks.getDaysFeedbacks($stateParams.id).$loaded();
                  }
                }

            });


        // redirects to default route for undefined routes
        $urlRouterProvider.otherwise('/app/home');
    });
