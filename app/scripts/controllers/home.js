'use strict';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the bkFoodApp
 */
angular.module('bkFoodApp')
    .controller('HomeCtrl', function($scope) {
        $.ajax({
            url: "http://localhost:3000/api/getallproduct",
            type: "get",
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: "json",
            success: function(result) {
                $scope.$apply(function() {
                    $scope.list_product = result;
                });
            },
            error: function(result) {
                console.log({
                    message: {
                        error: true
                    }
                });
            }
        });
        $scope.items = {
            name: "Văn Cường",
            website: "freetuts.net"
        };
    });