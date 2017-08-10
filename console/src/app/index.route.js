(function () {

    'use strict';

    angular
        .module('console')
        .config(routeConfig);

    /** ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/console/login');

        $stateProvider
            .state('console', {
                abstract : true,
                url : '/console',
                views : {
                    'main@' : {
                        templateUrl : 'core/layouts/default/main.html',
                        controller : 'MainController as vm'
                    },
                    'content@console' : {
                        templateUrl : 'core/layouts/default/content.html'
                    }

                }
            })
            .state('console.dashboard', {
                url : '/dashboard'
            })
            .state('console.login', {
                url : '/login',
                views : {
                    'page@console' : {
                        templateUrl : 'core/views/login/login.html',
                        controller : 'LoginController as vm'
                    }
                }
            })

    }
})();