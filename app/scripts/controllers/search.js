'use strict';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the bkFoodApp
 */
// angular.module('bkFoodApp')
//     .controller('SearchCtrl', function($scope, $rootScope) {
//         $rootScope.search = function() {
//             console.log("a");
//             console.log($('#search').val());
//         }
//     });
angular.module('bkFoodApp')
    .controller('SearchCtrl', function($scope, $rootScope, $log) {
        // $rootScope.search = function() {
        //     var _url = "http://localhost:3000/api/search/" + $('#search').val();
        //     $.ajax({
        //         url: _url,
        //         type: "get",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         dataType: "json",
        //         success: function(result) {
        //             // console.log(result);
        //             // $scope.$apply(function() {
        //             //     $scope.list_product = result;
        //             // });
        //             $scope.list_search = result;	
        //         },
        //         error: function(result) {
        //             console.log({
        //                 message: {
        //                     error: true
        //                 }
        //             });
        //         }
        //     });
        // }
        $scope.totalItems = 64;
        $scope.currentPage = 4;

        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.maxSize = 5;
        $scope.bigTotalItems = 175;
        $scope.bigCurrentPage = 1;
    });