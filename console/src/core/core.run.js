(function () {
    'use strict';

    angular
        .module('udvi.core')
        .run(runBlock);

    /** @ngInject */
    function runBlock() {
        console.log("Initializing CORE");
    }

})();