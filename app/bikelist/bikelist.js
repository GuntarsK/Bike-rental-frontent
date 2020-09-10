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
                manufacturer: $scope.manufacturerSearch,
                model: $scope.modelSearch,
                category: $scope.categorySearch,
                price: $scope.priceSearch,
                pcs_in_stock: $scope.pcsinstockSearch
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

        $scope.deleteClick = function (bikePk) {
            $httpClient.delete("http://127.0.0.1:8080/api/rest/bike.svc/bike("+bikePk+")")
                .then(function (response) {
                    if (response.data != null && response.data.result === "SUCCESS") {
                        for (var i = 0; i < $scope.bikeArray.length; ++i) {
                            if ($scope.bikeArray[i].bike_pk === bikePk) {
                                $scope.bikeArray.splice(i, 1);
                                console.log("DELETED PK: " + bikePk);
                            }
                        }
                        // Message
                    } else {
                        // Warning
                    }
                })
        }

        $scope.updateClick = function (bikePk) {
            window.location.href="#!/bike?action=edit&id=" + bikePk;
        }

        $scope.addNewClick = function () {
            window.location.href="#!/bike";
        }



    }]);
