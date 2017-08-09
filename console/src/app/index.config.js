(function ()
{
    'use strict';

    angular
        .module('console')
        .config(config);

    /** @ngInject */
    function config(uiNavigationServiceProvider)
    {
        uiNavigationServiceProvider.register('console', {
            title : 'SAMPLE',
            icon : 'lnr lnr-home',
            group : true,
            weight : 1
        });

        uiNavigationServiceProvider.register('dashboard', {
            title : 'DASHBOARD',
            icon : 'lnr lnr-rocket',
            weight : 1
        });

        uiNavigationServiceProvider.register('dashboard1', {
            title : 'DASHBOARD1',
            icon : 'lnr lnr-apartment',
            weight : 1
        });
        uiNavigationServiceProvider.register('dashboard1.test1', {
            title : 'TEST 1',
            icon : 'lnr lnr-apartment',
            weight : 1
        });
        uiNavigationServiceProvider.register('dashboard1.test1.test', {
            title : 'TEST',
            icon : 'lnr lnr-apartment',
            weight : 1
        });
        uiNavigationServiceProvider.register('dashboard1.test2.test.test123.test234', {
            title : 'TEST',
            icon : 'lnr lnr-apartment',
            weight : 1
        });
        uiNavigationServiceProvider.register('dashboard1.test2', {
            title : 'TEST 2',
            icon : 'lnr lnr-apartment',
            weight : 1
        });
    }

})();