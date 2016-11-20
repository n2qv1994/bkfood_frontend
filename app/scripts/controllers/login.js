'use strict';

/**
 * @ngdoc function
 * @name bkFoodApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the bkFoodApp
 */
angular.module('bkFoodApp')
    .controller('LoginCtrl', function($scope, $http) {
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        $scope.login1 = function() {
            var data = {
                username: $("#username1").val(),
                password: $("#password1").val()
            };
            // $http.post("http://localhost:3000/api/login",{user: data}, config);
            $.ajax({
                url: "http://localhost:3000/api/login",
                type: "post",
                data:JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
                dataType: "json",
                success: function(result) {
                    console.log(result);
                },
                error: function(result) {
                    console.log({ message: { error: true } });
                }
            });
        };
    });