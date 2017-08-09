(function () {
    'use strict';

    angular
        .module('udvi.core')
        .config(config);

    /** @ngInject */
    function config($ariaProvider, $logProvider) {

        $logProvider.debugEnabled(true);

        $ariaProvider.config({
            tabindex: false
        })
    }
})();