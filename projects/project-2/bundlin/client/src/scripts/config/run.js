app.run(function($rootScope, SEO, $state, tooltips, stateTransition, debouncedEvents, $window, $filter, scrollToggler, $timeout, $document, sideextensions, Auth, $urlRouter) {

    // Rootscope variables
    $rootScope.generalLoading = 'intro';
    $rootScope.state = $state;
    $rootScope.filter = $filter;
    $rootScope.extraStateParams = false;
    $rootScope.Modernizr = Modernizr;
    $rootScope.stateTransition = {
        time: 0,
        status: 'in',
        same: false
    };
    $rootScope.BLN_BUILD_TIMESTAMP = BLN_BUILD_TIMESTAMP;

    debouncedEvents.onResize(function() {
        $rootScope.mobile = $window.innerWidth < 768;
    }, 30);

    var prevent = function (event) {
        event.preventDefault();
        $urlRouter.update(true);
    };

    // On state change
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

        if(toState.name == 'app.home') {
            prevent(event);
            Auth.user()
                .then(function(user) {
                    if (user.hasRole('beta', 'admin')) {
                        $state.go('app.home.feed.popular');
                    } else {
                        $state.go('app.home.intro');
                    }
                }, function() {
                    $state.go('app.home.intro');
                });
            return false;
        }
        if(toState.name == 'app.profile'){
            prevent(event);
            Auth.user()
                .then(function(user) {
                    if (user.hasRole('beta', 'admin')) {
                        $state.go('app.view_profile.bundles', {profileScreenName: user.username});
                    } else {
                        $state.go('app.home');
                    }
                }, function() {
                    $state.go('app.home');
                });
            return false;
        }
        

        // Loading
        if($rootScope.generalLoading !== 'intro') {
            $rootScope.generalLoading = 'loading';
            $rootScope.pageLoading = 'loading';
        }

        // Disable all sideextensions
        sideextensions.disableAll();
        tooltips.disableAll();

        // Enable scroll
        scrollToggler.enable();

        // State transition handling
        toState.extraParams = $rootScope.extraStateParams;
        $rootScope.extraStateParams = false;
        stateTransition.run(event, toState, toParams, fromState, fromParams, function() {
            // Pre
            SEO.reset();
        }, function() {
            // Post
            $rootScope.appSidebar = toState.sidebar || $rootScope.appSidebar;
            $rootScope.appSidebarScope = {};
            $rootScope.loading = {
                state: false
            };
            
            // Go to top of page
            $document.scrollTo(angular.element(document.querySelector('html')), 0, 0);
        });
    });

    $rootScope.$on('$stateChangeSuccess', function() {
        $timeout(function(){
            if($rootScope.pageLoading === 'loading') $rootScope.pageLoading = 'loaded';

        }, 1000)
        $timeout(function() {
            // Loading
            if($rootScope.generalLoading === 'loading') $rootScope.generalLoading = 'loaded';
        }, 2000);
    });

    $timeout(function() {
        $rootScope.pageLoading = 'loaded';
        $rootScope.generalLoading = 'loaded';
    }, 3000);

});