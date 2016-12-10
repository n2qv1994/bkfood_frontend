'use stricti';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the bkFoodApp
 */
angular.module('bkFoodApp')
    .controller('HomeCtrl', function($scope, $rootScope, $location) {
        $scope.image_detail = "";
        $scope.name_detail = "";
        $scope.provider_detail = "";
        $scope.category_detail = "";
        $scope.description_detail = "";
        $scope.rank_detail = "";
        $scope.unit_detail = "";
        $scope.price_detail = "";
        var hide = true;
        var username = "";
        var socket = null;
        var key_param = "username=giapvn";
        socket = io.connect('http://localhost:3000/', { reconnect: true, query: key_param, forceNew: true });
        $('#order').on('click', function() {
            var data = {};
            data.from = username;
            data.to = "giapvn";
            data.message = "dm Giap Tuat";
            socket.emit('order', data);
        });
        socket.on('order', function(data) {
            $rootScope.verity = "Dm Giap Tuat";
            $("#verifyModal").modal("show");
        });

        $.ajax({
            url: "http://localhost:3000/api/getallproduct",
            type: "get",
            headers: {
                'Content-Type': 'application/json'
            },
            dataType: "json",
            success: function(result) {
                console.log(result);
                $scope.$apply(function() {
                    $scope.list_product = result;
                });
                $('#myCarouselProduct').carousel({
                    interval: 40000
                });
                // $('.carousel-product .item').each(function() {
                //     var next = $(this).next();
                //     if (!next.length) {
                //         next = $(this).siblings(':first');
                //     }
                //     next.children(':first-child').clone().appendTo($(this));

                //     for (var i = 0; i < 2; i++) {

                //         next = next.next();

                //         if (!next.length) {

                //             next = jQuery(this).siblings(':first');

                //         }

                //         next.children(':first-child').clone().appendTo($(this));

                //     }
                // });
            },
            error: function(result) {
                console.log({
                    message: {
                        error: true
                    }
                });
            }
        });
        $rootScope.logout = function() {
            var _url = "http://localhost:3000/api/signout/" + username;
            $.ajax({
                url: _url,
                type: "get",
                headers: {
                    'Content-Type': 'application/json'
                },
                dataType: "json",
                success: function(result) {
                    $("#login").show();
                    $("#signup").show();
                    $("#welcome").hide();
                    $("#logout").hide();
                    $("#infomation").hide(1000);
                    hide = true;
                },
                error: function(result) {
                    console.log(result);
                }
            });
        };

        $rootScope.info = function() {
            if (hide) {
                $("#infomation").show(1000);
                hide = false;
                console.log("show");
            } else {
                $("#infomation").hide(1000);
                hide = true;
                console.log("hide");
            }
        }
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
                    $rootScope.root_id = result.user._id;
                    username = result.user.username;
                    $("#loginModal").modal("hide");
                    $("#login").hide();
                    $("#signup").hide();
                    $("#welcome").show();
                    $("#logout").show();
                    $("#management").show();
                    // var key_param = "username=" + result.user.username;
                    // socket = io.connect('http://localhost:3000/', { reconnect: true, query: key_param, forceNew: true });
                    // socket.on('order', function(data) {
                    //     $rootScope.verity = data.from + "say: " + data.message;
                    //     $("#verifyModal").modal("show");
                    //     console.log(data);
                    // });
                    // $('#order').on('click', function() {
                    //     var data = {};
                    //     data.from = username;
                    //     data.to = "giapvn";
                    //     data.message = "dm Giap Tuat";
                    //     socket.emit('order', data);
                    // });
                    $scope.$apply(function() {
                        $rootScope.welcome = result.user.username;
                        $rootScope.info_name = result.user.name;
                        $rootScope.info_password = result.user.password;
                        $rootScope.info_email = result.user.email;
                        $rootScope.info_address = result.user.location;
                        $rootScope.info_phonenumber = result.user.phone;
                    });
                },
                error: function(result) {
                    $rootScope.message_res = result.responseText;
                    $("#wrong").show();
                    console.log(result.responseText);
                }
            });
        };
        $rootScope.edit_info = function() {
            var data = {
                user_id: $rootScope.root_id,
                name: $("#info_name").val(),
                password: $("#info_password").val(),
                email: $("#email_signup").val(),
                location: $("#info_address").val(),
                phone: $("#info_phonenumber").val()
            };
            $.ajax({
                url: "http://localhost:3000/api/editprofile",
                type: "post",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                dataType: "json",
                success: function(result) {
                    console.log("success");
                    $("#infomation").hide();
                    hide = true;
                    $("#verifyModal").modal("show");
                    $rootScope.verify = result.responseText;
                },
                error: function(result) {
                    console.log(result);
                    console.log("error");
                    $("#infomation").hide();
                    hide = true;
                    $("#verifyModal").modal("show");
                    $rootScope.verify = result.responseText;
                }
            });
        };
        $rootScope.sign_up = function() {
            $("#sign_up_success").hide();
            $("#sign_up_error").hide();
            var name_signup = $("#name_signup").val();
            var username_signup = $("#username_signup").val();
            var password_signup = $("#pwd_signup").val();
            var email_signup = $("#email_signup").val();
            var location_signup = $("#address_signup").val();
            var phonenumber_signup = $("#phonenumber_signup").val();
            if (username_signup == "" || password_signup == "") {
                $("#sign_up_error").show();
                $rootScope.message_res_signup = "username and password not null"
            } else {
                var data = {
                    name: name_signup,
                    username: username_signup,
                    password: password_signup,
                    email: email_signup,
                    location: location_signup,
                    phone: phonenumber_signup
                };
                $.ajax({
                    url: "http://localhost:3000/api/signup",
                    type: "post",
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    dataType: "json",
                    success: function(result) {
                        $rootScope.verify = "sign up success";
                        $("#signupModal").modal("hide");
                        $("#verifyModal").modal("show");
                        $("#sign_up_success").hide();
                        $("#sign_up_error").hide();
                        $("#name_signup").val("");
                        $("#username_signup").val("");
                        $("#pwd_signup").val("");
                        $("#email_signup").val("");
                        $("#address_signup").val("");
                        $("#phonenumber_signup").val("");
                        $("#sign_up_success").show();
                        $("#sign_up_error").hide();
                    },
                    error: function(result) {
                        console.log(result);
                        $("#sign_up_success").hide();
                        $("#sign_up_error").show();
                        $scope.$apply(function() {
                            $rootScope.message_res_signup = result.responseText;
                        });
                    }
                });

            }

        };
        $rootScope.cancel = function() {
            $("#infomation").hide(1000);
            hide = true;
        }
        $scope.purchase = function() {
            var product = "<tr><td>Picture</td><td>" + $scope.name_detail + "</td><td>" + $scope.price + "</td><td><button class='delete'>Delete</button></td></tr>";
            $("#cart").append(product);

        };
        $("#cart").on('click', '.delete', function() {
            console.log('delete');
            $(this).parent().parent().remove();
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
        };
        $rootScope.upgrade = function() {
            $location.path("/management");
        };
    });