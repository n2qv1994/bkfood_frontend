'use strict';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bkFoodApp
 */
angular.module('bkFoodApp')
  .controller('AboutCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.name = " viet";
  });
