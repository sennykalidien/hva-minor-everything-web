/**
 * @ngdoc filter
 * @name bundleItemLink
 * @param {string} bundle_sid - the _sid value of the bundle
 * @param {string} item_sid - the _sid value of the item inside the bundle
 * @description
 *     constructs a url for a specific bundle item
 * @example
 *     {{ bundle._sid | bundleItemLink:item._sid }}
 */
app.filter('bundleItemLink', function(Restangular) {
    return function(bundle_sid, item_sid) {
        if(bundle_sid && item_sid) {
            return Restangular.configuration.baseUrl + '/c/' + bundle_sid + '/' + item_sid;
        } else {
            return bundle_sid;
        }
    };
});