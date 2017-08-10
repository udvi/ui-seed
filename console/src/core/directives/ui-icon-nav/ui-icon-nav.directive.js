(function () {

    'use strict';

    angular.module('udvi.core')
        .controller('UiIconNavController', uiIconNavController)
        .directive('uiIconNav', uiIconNavDirective)
        .controller('UiIconNavNodeController', uiIconNavNodeController)
        .directive('uiIconNavNode', uiIconNavNodeDirective)
        ;

    /** @ngInject */
    function uiIconNavController($scope, uiNavigationService) {
        var vm = this;
        if ($scope.root) {
            vm.navigation = uiNavigationService.getNavigation($scope.root);
        } else {
            vm.navigation = uiNavigationService.getNavigation();
        }
    }

    /** @ngInject */
    function uiIconNavDirective() {
        return {
            restrict : 'E',
            scope : {
                root : '@'
            },
            controller : 'UiIconNavController as vm',
            templateUrl : 'core/directives/ui-icon-nav/templates/ui-icon-nav.tmpl.html',
            transclude : true,
            compile : function (element, attrs) {
                //console.log('Compile');
                return {
                    pre : function preLink( $scope, element, attributes) {
                        $scope.data = attributes;
                        //console.log( attributes + ' (pre-link)'  );
                    },
                    post : function postLink($scope, element, attributes) {
                        //console.log( attributes + ' (post-link)'  );
                    }
                }
            }

        }
    }

    /** @ngInject */
    function uiIconNavNodeController($scope, uiNavigationService, $state, $element) {
        var vm = this;
        vm.element = $element;
        vm.node = $scope.node;
    }

    /** @ngInject */
    function uiIconNavNodeDirective() {

        return {
            restrict : 'E',
            replace : true,
            bindToController : {
                node : '='
            },
            controller : 'UiIconNavNodeController as vm',
            templateUrl : 'core/directives/ui-icon-nav/templates/ui-icon-nav-node.tmpl.html',
            compile : function (element, attrs) {
                //console.log('Compile');
                return {
                    pre : function preLink( $scope, element, attributes) {
                        //console.log( attributes + ' (pre-link)'  );
                    },
                    post : function postLink($scope, element, attributes) {
                        //console.log( attributes + ' (post-link)'  );
                    }
                }
            }
        }

    }
})();