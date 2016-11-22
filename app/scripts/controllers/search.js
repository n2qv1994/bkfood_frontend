'use strict';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the bkFoodApp
 */
angular.module('bkFoodApp')
    .controller('SearchCtrl', function($scope, $rootScope, $log) {
        $rootScope.search = function() {
            var _url = "http://localhost:3000/api/search/" + $('#search').val();
            $.ajax({
                url: _url,
                type: "get",
                headers: {
                    'Content-Type': 'application/json'
                },
                dataType: "json",
                success: function(result) {
                    console.log(result);
                    // $scope.$apply(function() {
                    //     $scope.list_product = result;
                    // });
                    $scope.list_search = result;	
                },
                error: function(result) {
                    console.log({
                        message: {
                            error: true
                        }
                    });
                }
            });
        }
    });