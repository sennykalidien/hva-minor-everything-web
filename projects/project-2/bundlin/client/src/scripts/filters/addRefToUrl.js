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
app.filter('addRefToUrl', function() {
    return function(url) {
        if(url) {
            if(url.indexOf('?') > -1) {
                return url.replace('?','?ref=bundlin&')
            } else {
                return url += '?ref=bundlin';
            }
        } else {
            return url;
        }
    };
})
    .filter('trustedUrl', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);