'use strict';

angular.module('myApp.bike', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/bike', {
            templateUrl: 'bike/bike.html',
            controller: 'BikeCtrl'
        });
    }])

    .controller('BikeCtrl', ['$scope', '$http', '$routeParams',
        function($scope, $httpClient, $routeParams) {

        var actionUrl = $routeParams.action;
        var id = $routeParams.id;

        if (actionUrl === 'edit') {
            // GET BIKE BY ID

            $scope.action = "Edit";
        } else {
            $scope.action = "Register";
        }



        $scope.submitBike = function () {
            console.log("Bike submit button clicked");

            var bikeDto = {
                "manufacturer": $scope.manufacturer,
                "bike_model": $scope.bike_model,
                "category": $scope.category,
                "price": $scope.price,
                "pcs_in_stock": $scope.pcs_in_stock,
                "status": "ACTIVE"
            }
            if ($routeParams.action === 'edit') {
                bikeDto.bike_pk = $routeParams.id;
            }

            var submitData = JSON.stringify(bikeDto);

            if ($routeParams.action === 'edit') {
                $httpClient.put("http://127.0.0.1:8080/api/rest/bike.svc/bike", submitData)
                    .then(function (response) {
                        console.log(response);

                        if (response.data.result != null && response.data.result === "SUCCESS") {
                            window.location.href="#!/bikelist";
                        } else {
                            if (response.data.errorType === "ERROR") {
                                document.getElementById("bikeRegisterError").style.display = 'block';
                                document.getElementById("bikeRegisterWarning").style.display = 'none';
                                document.getElementById("registerErrorMessage").textContent = response.data.message;

                            } else if (response.data.globalErrorType === "WARNING") {
                                document.getElementById("bikeRegisterError").style.display = 'none';
                                document.getElementById("bikeRegisterWarning").style.display = 'block';
                                document.getElementById("registerWarningMessage").textContent = response.data.message;
                            }
                        }
                    })

            } else {

                $httpClient.post("http://127.0.0.1:8080/api/rest/bike.svc/bike", submitData)
                    .then(function (response) {
                        console.log(response);

                        if (response.data.result != null && response.data.result === "SUCCESS") {
                            window.location.href="#!/bikelist";
                        } else {
                            if (response.data.errorType === "ERROR") {
                                document.getElementById("bikeRegisterError").style.display = 'block';
                                document.getElementById("bikeRegisterWarning").style.display = 'none';
                                document.getElementById("registerErrorMessage").textContent = response.data.message;

                            } else if (response.data.globalErrorType === "WARNING") {
                                document.getElementById("bikeRegisterError").style.display = 'none';
                                document.getElementById("bikeRegisterWarning").style.display = 'block';
                                document.getElementById("registerWarningMessage").textContent = response.data.message;
                            }
                        }
                    })
            }
        }


    }]);
