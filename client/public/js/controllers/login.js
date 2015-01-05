(function() {

    'use strict';

    angular.module('controllers.login', [
            'ngResource',
            'ngRoute',
            'services.auth'
        ])
        .controller('LoginController', [
            '$scope',
            '$location',
            '$timeout',
            'AuthService',
            function($scope, $location, $timeout, AuthService) {
                if (AuthService.isOnline()) {
                    $location.path('/');
                }

                $scope.session = {
                    email: '',
                    password: ''
                };

                $scope.send = function() {
                    $scope.login_form.invalid_auth = false;
                    $scope.login_form.submitted = true;
                    //It's a workaround to be sure that the form is correctly managed when Google chrome or any other browser
                    //autofill the form. In that case, the event 'iput field change' is not fired, so the angular model is not
                    //updated and login_form.$valid must be moved to the last place in the event queue to be sure that the validation
                    //is performed after the model is manually updated.
                    $scope.session = {
                        email: angular.element(document.getElementById('email')).val(),
                        password: angular.element(document.getElementById("password")).val()
                    };
                    $timeout(function() {
                        if ($scope.login_form.$valid) {
                            AuthService.login($scope.session).then(function(result) {
                                if (result.success) {
                                    if (result.login) {
                                        $location.path('/');
                                    } else {
                                        $scope.login_form.invalid_auth = true;
                                    }
                                } else {
                                    $scope.login_form.invalid_auth = true;
                                    console.warn('Server Error (500)', result.error);
                                }
                            });
                        }
                    }, 0);
                };
            }
        ]);
})();
