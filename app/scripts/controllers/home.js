'use strict';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the bkFoodApp
 */
angular.module('bkFoodApp')
  .controller('HomeCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
