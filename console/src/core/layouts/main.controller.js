(function () {
    'use strict';

    angular
        .module('udvi.core')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController ($scope, $rootScope) {
        var vm = this;

        $scope.$on('$viewContentAnimationEnded', function (event)
        {
            if ( event.targetScope.$id === $scope.$id )
            {
                $rootScope.$broadcast('uiSplashScreen::remove');
            }
        });
    }
})();