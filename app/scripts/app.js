'use strict';

/**
 * @ngdoc overview
 * @name CanteenFeedback
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */


angular.module('CanteenFeedback', ['ionic', 'ngCordova', 'ngResource', 'ngSanitize', 'firebase'])

    .run(function($ionicPlatform) {

        $ionicPlatform.ready(function() {
            // save to use plugins here
        });



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
                templateUrl: 'templates/main.html',
                controller: 'MainController'
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
                  feedbacks: function (Feedbacks){
                    return Feedbacks.getWeekFeedbacks().$loaded();
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

            });


        // redirects to default route for undefined routes
        $urlRouterProvider.otherwise('/app/home');
    });
