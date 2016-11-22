'use strict';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the bkFoodApp
 */
angular.module('bkFoodApp')
    .controller('HomeCtrl', function($scope, $rootScope) {
        $scope.image_detail = "";
        $scope.name_detail = "";
        $scope.provider_detail = "";
        $scope.category_detail = "";
        $scope.description_detail = "";
        $scope.rank_detail = "";
        $scope.unit_detail = "";
        $scope.price_detail="";
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
        $rootScope.login = function() {
            var data = {
                username: $("#username_login").val(),
                password: $("#pwd_login").val()
            };
            $.ajax({
                url: "http://localhost:3000/api/login",
                type: "post",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                dataType: "json",
                success: function(result) {
                    console.log(result);
                },
                error: function(result) {
                    console.log({
                        message: {
                            error: true
                        }
                    });
                }
            });
        };
        $scope.purchase = function() {
            var product =  "<tr><td>Picture</td><td>"+$scope.name_detail+"</td><td>"+$scope.price+"</td><td><button class='delete'>Delete</button></td></tr>";
            $("#cart").append(product);

        };
        $(".delete").click(function() {
            console.log('delete');
            $(this).parent().remove();
        });
        $scope.show_detail = function(product) {
            console.log(product);
            $scope.image_detail = product.image;
            $scope.name_detail = product.product_name;
            $scope.provider_detail = product.provider_id;
            $scope.category_detail = product.category;
            $scope.description_detail = product.description;
            $scope.rank_detail = product.rank;
            $scope.unit_detail = product.unit;
            $scope.price = product.price;
        }
    });