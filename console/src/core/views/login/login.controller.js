(function () {
    'use strict';

    angular.module('udvi.core')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($rootScope, $scope, $state, uiSecurityService) {
        console.log("Login Controller");
        var vm = this;
        vm.loginRequest = {};

        vm.login = function () {
            console.log('Processing login');
            $rootScope.isAuthenticated = true;
            $state.go('console.dashboard');
        }
    }
})();