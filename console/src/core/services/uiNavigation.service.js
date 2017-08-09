(function () {
    'use strict';

    angular.module('udvi.core')
        .provider('uiNavigationService', uiNavigationServiceProvider);

    /** @ngInject */
    function  uiNavigationServiceProvider () {

        var navigation = [];

        this.register = register;

        // SERVICE
        this.$get = function () {
            var service = {
                register : register,
                getNavigation : getNavigation,
                getFlatNavigation : getFlatNavigation
            };

            return service;
        };

        function register(path, item) {
            if(!angular.isString(path)) {
                console.warn('State Id must be string (eg. `console.dashboard`)');
                return;
            }

            var parts = path.split('.');

            // Generate the object id from the parts
            var id = parts[parts.length - 1];

            // Get the parent item from the parts
            var parent = _findOrCreateParent(parts);

            // Decide if we are going to update or create
            var updateItem = false;

            for ( var i = 0; i < parent.length; i++ )
            {
                if ( parent[i]._id === id )
                {
                    updateItem = parent[i];

                    break;
                }
            }

            // Update
            if ( updateItem )
            {
                angular.extend(updateItem, item);

                // Add proper ui-sref
                updateItem.uisref = _getUiSref(updateItem);
            }
            // Create
            else
            {
                // Create an empty children array in the item
                item.children = [];

                // Add the default weight if not provided or if it's not a number
                if ( angular.isUndefined(item.weight) || !angular.isNumber(item.weight) )
                {
                    item.weight = 1;
                }

                // Add the item id
                item._id = id;

                // Add the item path
                item._path = path;

                // Add proper ui-sref
                item.uisref = _getUiSref(item);

                // Push the item into the array
                parent.push(item);
            }


        }

        /**
         * Return navigation array
         *
         * @param root
         * @returns Array
         */
        function getNavigation(root)
        {
            if ( root )
            {
                for ( var i = 0; i < navigation.length; i++ )
                {
                    if ( navigation[i]._id === root )
                    {
                        return [navigation[i]];
                    }
                }

                return null;
            }

            return navigation;
        }

        /**
         * Return flat navigation array
         *
         * @param root
         * @returns Array
         */
        function getFlatNavigation(root)
        {
            // Get the correct navigation array
            var navigation = getNavigation(root);

            // Flatten the navigation object
            return _flattenNavigation(navigation);
        }

        /**
         * Find or create parent
         *
         * @param parts
         * @returns {Array|Boolean}
         * @private
         */
        function _findOrCreateParent(parts)
        {
            // Store the main navigation
            var parent = navigation;

            // If it's going to be a root item
            // return the navigation itself
            if ( parts.length === 1 )
            {
                return parent;
            }

            // Remove the last element from the parts as
            // we don't need that to figure out the parent
            parts.pop();

            // Find and return the parent
            for ( var i = 0; i < parts.length; i++ )
            {
                var _id = parts[i],
                    createParent = true;

                for ( var p = 0; p < parent.length; p++ )
                {
                    if ( parent[p]._id === _id )
                    {
                        parent = parent[p].children;
                        createParent = false;

                        break;
                    }
                }

                // If there is no parent found, create one, push
                // it into the current parent and assign it as a
                // new parent
                if ( createParent )
                {
                    var item = {
                        _id     : _id,
                        _path   : parts.join('.'),
                        title   : _id,
                        weight  : 1,
                        children: []
                    };

                    parent.push(item);
                    parent = item.children;
                }
            }

            return parent;
        }

        /**
         * Setup the ui-sref using state & state parameters
         *
         * @param item
         * @returns {string}
         * @private
         */
        function _getUiSref(item)
        {
            var uisref = '';

            if ( angular.isDefined(item.state) )
            {
                uisref = item.state;

                if ( angular.isDefined(item.stateParams) && angular.isObject(item.stateParams) )
                {
                    uisref = uisref + '(' + angular.toJson(item.stateParams) + ')';
                }
            }

            return uisref;
        }

        /**
         * Sort by weight
         *
         * @param x
         * @param y
         * @returns {number}
         * @private
         */
        function _byWeight(x, y)
        {
            return parseInt(x.weight) - parseInt(y.weight);
        }

        /**
         * Flatten the given navigation
         *
         * @param navigation
         * @private
         */
        function _flattenNavigation(navigation)
        {
            var flatNav = [];

            for ( var x = 0; x < navigation.length; x++ )
            {
                // Copy and clear the children of the
                // navigation that we want to push
                var navToPush = angular.copy(navigation[x]);
                navToPush.children = [];

                // Push the item
                flatNav.push(navToPush);

                // If there are child items in this navigation,
                // do some nested function magic
                if ( navigation[x].children.length > 0 )
                {
                    flatNav = flatNav.concat(_flattenNavigation(navigation[x].children));
                }
            }

            return flatNav;
        }
    }
})();