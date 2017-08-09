(function () {

    'use strict';

    angular
        .module('console')
        .run(runBlock);

    /** @ngInject */
    function runBlock () {
        console.log("Initializing CONSOLE");
    }
})();