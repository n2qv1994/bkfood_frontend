'use strict';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:ManagementCtrl
 * @description
 * # ManagementCtrl
 * Controller of the bkFoodApp
 */
angular.module('bkFoodApp')
    .controller('ManagementCtrl', function($scope, $rootScope) {
        var product_id = "";
        $.ajax({
            url: "http://localhost:3000/api/getproductbyproviderid/" + $rootScope.root_id,
            type: "get",
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: "json",
            success: function(result) {
                console.log(result[0]);
                $scope.$apply(function() {
                    $scope.list_product_provider = result;
                });
            },
            error: function(result) {
                // $rootScope.message_res = result.responseText;
                // $("#wrong").show();
                // console.log(result.responseText);
                console.log("err");
            }
        });
        $.ajax({
            url: "http://localhost:3000/api/getproductbycategory/" + $rootScope.root_id + "/banh",
            type: "get",
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: "json",
            success: function(result) {
                console.log(result[0]);
                $scope.$apply(function() {
                    $scope.list_banh = result;
                });
            },
            error: function(result) {
                console.log("err");
            }
        });
        $.ajax({
            url: "http://localhost:3000/api/getproductbycategory/" + $rootScope.root_id + "/gai",
            type: "get",
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: "json",
            success: function(result) {
                console.log(result[0]);
                $scope.$apply(function() {
                    $scope.list_gai = result;
                });
            },
            error: function(result) {
                console.log("err");
            }
        });
        $scope.add_product = function() {
            if ($rootScope.root_id == "" || $rootScope.root_id == null || $rootScope.root_id == undefined) {
                alert("u must login");
                return
            }
            var data = {
                product_name: $("#name-product").val(),
                provider_id: $rootScope.root_id,
                description: $("#description-product").val(),
                price: $("#price-product").val(),
                unit: $("#unit-product").val(),
                category: $("#category-product").val(),
                image: $("#image-product").val(),
            };
            $.ajax({
                url: "http://localhost:3000/api/addproduct",
                type: "post",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                dataType: "json",
                success: function(result) {
                    $scope.$apply(function() {
                        $scope.product_add = result[0];
                        $("#product-provider").append('<div class="col-md-3"><img src="images/' + result[0].image + '" style="width:150px; height=150px"><button class="col-md-6">Edit</button><button class="col-md-6">Remove</button></div>');
                        $("#verifyAddModal").modal("show");
                    });
                },
                error: function(result) {
                    console.log("err");
                }
            });
        };
        $scope.remove_product = function(product) {
            $.ajax({
                url: "http://localhost:3000/api/removeproduct/" + product._id,
                type: "get",
                headers: {
                    'Content-Type': 'application/json'
                },
                dataType: "json",
                success: function(result) {
                    console.log(result);
                    $("#" + product._id).remove();
                },
                error: function(result) {
                    // $rootScope.message_res = result.responseText;
                    // $("#wrong").show();
                    // console.log(result.responseText);
                    console.log("err");
                }
            });
        };
        $scope.info_product = function(product) {

            product_id = product._id;
            $scope.name_product = product.product_name;
            $scope.price_product = product.price;
            $scope.unit_product = product.unit;
            $scope.category_product = product.category;
            $scope.image_product = product.image
            $scope.description_product = product.description;
        };
        $scope.edit_product = function() {
            var data = {
                product_id: product_id,
                product_name: $("#edit_name_product").val(),
                price: $("#edit_price_product").val(),
                unit: $("#edit_unit_product").val(),
                category: $("#edit_category_product").val(),
                image: $("#edit_image_product").val(),
                description: $("#edit_description_product").val()
            };
            console.log($("#edit_price_product").val());
            $.ajax({
                url: "http://localhost:3000/api/editproduct",
                type: "post",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                dataType: "json",
                success: function(result) {
                    console.log(result);
                    console.log("success");
                    $("#verifyAddModal").modal("show");
                },
                error: function(result) {
                    console.log(result);
                    console.log("error");
                }
            });
        };
        $scope.get_all = function() {
            $("#all-product-manager").show(1000);
            $("#banh-product-manager").hide();
            $("#gai-product-manager").hide();
        };
        $scope.get_banh = function() {
            $("#all-product-manager").hide();
            $("#banh-product-manager").show(1000);
            $("#gai-product-manager").hide();
        };
        $scope.get_gai = function() {
            $("#all-product-manager").hide();
            $("#banh-product-manager").hide();
            $("#gai-product-manager").show(1000);
        }
    });