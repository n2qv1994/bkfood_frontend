'use strict';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the bkFoodApp
 */
angular.module('bkFoodApp')
    .controller('SearchCtrl', function($scope, $rootScope, $log, $timeout) {
        $scope.list_search = null;
        $scope.list_provider_search = null;
        $rootScope.search = function() {

            if ($("#sel1").val() == "Product") {
                var _url = "http://localhost:3000/api/search/" + $('#search').val();
                $.ajax({
                    url: _url,
                    type: "get",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    dataType: "json",
                    success: function(result) {
                        // $scope.$apply(function() {
                        //     $scope.list_product = result;
                        // });
                        if (result == "") {
                            $scope.$apply(function() {
                                $scope.notify_search = " Not found " + $('#search').val();
                            });
                            $("#notify_search").show();
                        } else {
                            $("#notify_search").hide();
                            $scope.list_provider_search = null;
                            $scope.list_search = result;
                        }

                    },
                    error: function(result) {
                        console.log({
                            message: {
                                error: true
                            }
                        });
                    }
                });
            } else {
                var _url = "http://localhost:3000/api/searchprovider/" + $('#search').val();
                console.log($('#search').val());
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
                        if (result == "") {
                            $scope.notify_search = " not found" + $('#search').val();
                        };
                        $scope.list_search = null;
                        $scope.list_provider_search = result;
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

        }
        $scope.show_detail = function(product) {
            console.log(product);
            $scope.image_detail = product.image;
            $scope.name_detail = product.product_name;
            $scope.provider_detail = product.provider_id;
            $scope.category_detail = product.category;
            $scope.description_detail = product.description;
            $scope.rank_detail = product.rank;
            $scope.unit_detail = product.unit;
            $scope.price_detail = product.price;
        };
        $scope.purchase = function() {
            var product = "<tr><td>Picture</td><td>" + $scope.name_detail + "</td><td><input type='text' value='1' style='width:30px'></td><td>" + $scope.price_detail + "</td><td><button class='delete'>Delete</button></td></tr>";
            $("#cart").append(product);
        };
    });