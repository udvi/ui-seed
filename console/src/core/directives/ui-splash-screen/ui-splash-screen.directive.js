(function () {

    'use strict';

    angular
        .module('udvi.core')
        .directive('uiSplashScreen', uiSplashScreenDirective);

    /** @ngInject */
    function uiSplashScreenDirective($animate) {

        return {
            restrict : 'E',
            link : function (scope, ele) {
                var splashScreenRemoveEvent = scope.$on('uiSplashScreen::remove', function ()
                {
                    $animate.leave(ele).then(function ()
                    {
                        // De-register scope event
                        splashScreenRemoveEvent();

                        // Null-ify everything else
                        scope = ele = null;
                    });
                });
            }
        }
    }
})();