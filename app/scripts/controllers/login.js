'use strict';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bkFoodApp
 */
angular.module('bkFoodApp')
    .controller('LoginCtrl', function($scope) {

        $scope.login1 = function() {
            console.log($("#username1").val());
            $scope.name = $("#username1").val();
        };


    });