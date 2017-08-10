(function ()
{
    'use strict';

    angular
        .module('console')
        .config(config);

    /** @ngInject */
    function config(uiNavigationServiceProvider)
    {

        uiNavigationServiceProvider.register('dashboard', {
            title : 'DASHBOARD',
            icon : 'lnr lnr-rocket',
            weight : 1
        });

        uiNavigationServiceProvider.register('gameplay', {
            title : 'GAMEPLAY',
            icon : 'lnr lnr-list',
            weight : 2
        });

        uiNavigationServiceProvider.register('games', {
            title : 'GAMES',
            icon : 'lnr lnr-dice',
            weight : 3
        });

        uiNavigationServiceProvider.register('specials', {
            title : 'SPECIALS',
            icon : 'lnr lnr-magic-wand',
            weight : 4
        });

        uiNavigationServiceProvider.register('analytics', {
            title : 'ANALYTICS',
            icon : 'lnr lnr-chart-bars',
            weight : 5
        });

        uiNavigationServiceProvider.register('partners', {
            title : 'PARTNERS',
            icon : 'lnr lnr-earth',
            weight : 6
        });

        uiNavigationServiceProvider.register('organizations', {
            title : 'ORGANIZATIONS',
            icon : 'lnr lnr-apartment',
            weight : 7
        });

        uiNavigationServiceProvider.register('settings', {
            title : 'SETTINGS',
            icon : 'lnr lnr-cog',
            weight : 8
        });

    }

})();