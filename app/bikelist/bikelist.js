'use strict';

angular.module('myApp.bikelist', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/bikelist', {
            templateUrl: 'bikelist/bikelist.html',
            controller: 'BikelistCtrl'
        });
    }])

    .controller('BikelistCtrl', ['$scope', '$http',
        function($scope, $httpClient) {

        $scope.bikeArray = [];

        $scope.searchClick = function ($) {

            var bikeDto = {
                manufacturer: $scope.manufacturer,
                model: $scope.model,
                category: $scope.category,
                price: $scope.price,
                pcs_in_stock: $scope.pcs_in_stock
            }

            var submitData = JSON.stringify(bikeDto, function (key, value) {
                if (value === "") {
                    return null;
                }
                return value;
            })

            $httpClient.post("http://127.0.0.1:8080/api/rest/bike.svc/bikes/search",submitData)
                .then(function (response) {
                    console.log(response);
                    if (response.data.result != null && response.data.result === "SUCCESS") {
                        $scope.bikeArray = response.data.holderList;
                    }
                })
        }

        $httpClient.get("http://127.0.0.1:8080/api/rest/bike.svc/bikes")
            .then(function (response) {
                if (response.data.result != null && response.data.result === "SUCCESS") {
                    $scope.bikeArray = response.data.holderList;
                }
                console.log(response);

            })


    }]);
