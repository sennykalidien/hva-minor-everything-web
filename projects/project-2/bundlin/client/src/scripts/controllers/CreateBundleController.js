app.controller('CreateBundleController', function($scope, $rootScope, $stateParams, $state, Auth, Restangular, error, Bundles) {
    
    /***********************************************************************************************/
    /* Create bundle */
    /***********************************************************************************************/
    Bundles.createBundle().then(function (bundle) {
        $state.go('app.edit_bundle', {
            bundleId: bundle._sid
        });
    }, function (error) {
        $state.go('app');
    });

});
