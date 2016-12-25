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

        $scope.add_product = function() {
            var product_name = $("#name-product").val();
            var price = $("#price-product").val();
            var description = $("#description-product").val();
            var unit = $("#unit-product").val();
            var category = $("#category-product").val();
            if ($rootScope.root_id == "" || $rootScope.root_id == null || $rootScope.root_id == undefined) {
                alert("u must login");
                return;
            }
            if (product_name == "") {
                $scope.notify_management = "You must enter name of product";
                $("#notify_management").show();
                return;
            }
            if (price == "") {
                $scope.notify_management = "You must enter price of product";
                $("#notify_management").show();
                return;
            }
            if (unit == "") {
                $scope.notify_management = "You must enter unit of product";
                $("#notify_management").show();
                return;
            } else {
                $("#notify_management").hide();
                $("#managementProductModal").modal('hide');
                var data = {
                    product_name: product_name,
                    provider_id: $rootScope.root_id,
                    description: description,
                    price: price,
                    unit: unit,
                    category: category,
                    // image: $("#image-product").val(),
                    image: "default.png",
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
                            $("#product-provider").append('<div class="col-md-3"><img src="images/' + result[0].image + '" style="width:150px; height:100px""><h2 style="text-align:center; color:green">'+result[0].product_name+'</h2> <button class="col-md-5 btn btn-info">Edit</button><button class="col-md-6 col-md-offset-1 btn btn-danger">Remove</button></div>');
                            $("#verifyAddModal").modal("show");
                        });
                    },
                    error: function(result) {
                        console.log("err");
                    }
                });
            }
        };
        $scope.remove_product = function(product) {
            $("#removeModal").modal("show");
            $("#delete_product").on('click', function() {
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
            var product_name = $("#edit_name_product").val();
            var price = $("#edit_price_product").val();
            var unit = $("#edit_unit_product").val();
            var category = $("#edit_category_product").val();
            var image = $("#edit_image_product").val();
            var description = $("#edit_description_product").val();
            console.log("product_name" + product_name);
            if (product_name == "") {
                $("#notify_management_edit").show();
                $scope.notify_management_edit = "You must enter product_name of product";
                return;
            }
            if (price == "") {
                $("#notify_management_edit").show();
                $scope.notify_management_edit = "You must enter price of product";
                return;
            }
            if (unit == "") {
                $("#notify_management_edit").show();
                $scope.notify_management_edit = "You must enter unit of product";
                return;
            } else {
                var data = {
                    product_id: product_id,
                    product_name: product_name,
                    price: price,
                    unit: unit,
                    category: category,
                    image: image,
                    description: description
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
                        $("#notify_management_edit").hide();
                        $("#managementInfoProductModal").modal('hide');
                        console.log("success");
                        $("#verifyAddModal").modal("show");
                    },
                    error: function(result) {
                        console.log(result);
                        console.log("error");
                    }
                });
            }
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
        };
    });

