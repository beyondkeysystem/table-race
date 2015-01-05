'use strict';

angular.module('controllers.index', [
        'ngRoute'
    ])
    .controller('IndexController', [
        '$scope',
        '$location',
        function($scope, $location) {
            $scope.initiativeName = undefined;
            $scope.send = function() {
                $scope.index_form.submitted = true;
                if ($scope.index_form.$valid) {
                    $location.path('/audience-builder/step-1/new/' + $scope.initiativeName);
                }
            };
        }
    ]);