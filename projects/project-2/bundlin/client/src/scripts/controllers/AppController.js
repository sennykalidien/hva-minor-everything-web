app.controller('AppController', function($scope, Auth, $document, fieldWatcher, $animate, $analytics, $rootScope, scrollToggler) {
    $scope.setFocuspointForPlaceholder = function setFocuspointForPlaceholder(bundle){
        bundle.picture.focus_x = 50;
        bundle.picture.focus_y = 100;
    }
    /***********************************************************************************************/
    /* App config */
    /***********************************************************************************************/
    $animate.enabled(false);


    /***********************************************************************************************/
    /* User check */
    /***********************************************************************************************/
    Auth.user(true) // passing true to force session call
        .then(function () {
            $analytics.eventTrack('Session call', {category: 'System action', label: 'Success: user session created'});
        });


    /***********************************************************************************************/
    /* App event listeners */
    /***********************************************************************************************/
    $scope.modalIsActive = false;
    $rootScope.$on('modals:firstmodalopens', function () {
        scrollToggler.disable();
        $scope.modalIsActive = true;
    });

    $rootScope.$on('modals:lastmodalcloses', function () {
        scrollToggler.enable();
        $scope.modalIsActive = false;
    });


    /***********************************************************************************************/
    /* Secret thing */
    /***********************************************************************************************/
    fieldWatcher('turnaround', function() {
        $('html').addClass('fieldwatcher-turnaround');
        $document.scrollTo($("html"), 0, 500);
    }, $scope);
    fieldWatcher('comicsans', function() {
        $('*').addClass('fieldwatcher-comicsans');
    }, $scope);
    fieldWatcher('pleasebreath', function() {
        $('.bln-sidebaricon, .bln-bundleitem, .bln-title, .bln-paragraph, .bln-tags>li, .bln-author').addClass('fieldwatcher-pleasebreath');
    }, $scope);

});
