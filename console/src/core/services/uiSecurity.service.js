(function () {
    'use strict';

    angular.module('udvi.core')
        .provider('uiSecurityService', uiSecurityServiceProvider);

    /** @ngInject */
    function uiSecurityServiceProvider () {

        this.$get = function () {
            var service = {

            };
            return service;
        }
    }
})();