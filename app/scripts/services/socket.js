'use strict';

/**
 * @ngdoc service
 * @name bkFoodApp.socket
 * @description
 * # socket
 * Service in the bkFoodApp.
 */
angular.module('bkFoodApp')
    .service('socket', function($rootScope) {
        var socket_service = {
            socket_client: null,
        };
        var user_order = "";

        socket_service.init = function(user_name) {
            console.log("init socket");
            var key_param = "username=" + user_name;
            socket_service.socket_client = io.connect('http://localhost:3000/', { reconnect: true, query: key_param, forceNew: true });
            // socket_service.socket_client.heartbeatTimeout = 10000;
            // socket_service.socket_client.on('connect_error', function(error) {
            //     $emit('connect_server_error', error);
            // });
            // socket_service.socket_client.on('connect', function() {
            //     socket_service.set_init_storage();
            // })
        };
        socket_service.order = function(data) {
            console.log("send order");
            socket_service.socket_client.emit('order', data);
        };
        socket_service.receive_order = function() {
            console.log("receive");
            socket_service.socket_client.on('order', function(data) {
                console.log("receive");
                user_order = data.from;
                $rootScope.order = data.name;
                for (var i = 0; i < data.order.length; i++) {
                    var order = "<tr><td>Quoc Viet</td><td>01664447655</td><td>" + data.order[i].product + "</td><td>1</td><td>" + data.order[i].price + "</td><td>" + data.message + "</td></tr>";
                    $("#notify_order").append(order);
                };
                $("#orderModal").modal("show");
            });
        };
        socket_service.reply = function(user_name, message) {
            var data = {
                username: user_name,
                message: message
            };
            socket_service.socket_client.emit('reply', data);
        };
        socket_service.receive_reply = function() {
            socket_service.socket_client.on('reply', function(data) {
                console.log("data reply" + data);
                $rootScope.$apply(function() {
                    $rootScope.mes = data;
                    $("#verifyModal3").modal("show");
                });
            });
        };
        socket_service.user_order = function() {
            return user_order;
        };

        // socket_service.on = function(event_name, callback) {
        //     socket_service.socket_client.on(event_name, function(data) {
        //         callback(data);
        //     });
        // };

        // socket_service.emit = function(event_name, data) {
        //     socket_service.socket_client.emit(event_name, data);
        // };

        // socket_service.disconnect = function() {
        //     socket_service.socket_client.disconnect();
        // };

        // socket_service.set_init_storage = function() {
        //     localStorage.setItem("inited", socket_service.socket_client);
        //     $emit('connection', true);
        // };

        // socket_service.get_init_storage = function() {
        //     var result = localStorage.getItem("inited");
        //     if (result === undefined || result === null) {
        //         result = undefined;
        //     }
        //     return result;
        // };

        return socket_service;

    });