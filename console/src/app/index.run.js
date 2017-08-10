(function () {

    'use strict';

    angular
        .module('console')
        .run(runBlock);

    /** @ngInject */
    function runBlock ($rootScope, $state, $timeout) {
        console.log("Initializing CONSOLE");
        if ( !$rootScope.isAuthenticated) {
            $timeout(function () {
                $state.go('console.login');
            }, 500);
        };
    }
})();