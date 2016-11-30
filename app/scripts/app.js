'use strict';

/**
 * @ngdoc overview
 * @name bkFoodApp
 * @description
 * # bkFoodApp
 *
 * Main module of the application.
 */
angular
  .module('bkFoodApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .when('/management', {
        templateUrl: 'views/management.html',
        controller: 'ManagementCtrl',
        controllerAs: 'management'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
