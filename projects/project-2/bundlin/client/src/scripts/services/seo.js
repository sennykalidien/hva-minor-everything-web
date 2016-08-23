app.service('SEO', function($location, $rootScope) {

    var serviceThis = this;

    var defaults = {
        title: 'Bundlin - The beauty of the web, bundled.',
        description: 'Create, discover and share Bundles of links about your favorite subjects. Bundlin is handcrafted by Lifely in Amsterdam.',
        keywords: 'Bundlin, Create, Links, Lifely, Discover, Pim Verlaan, Nick de Bruijn, Bundle, Bundled, Bundling',

        opengraph: {
            'type': 'website',
            'title': 'Bundlin - The beauty of the web, bundled.',
            'description': 'Create, discover and share Bundles of links about your favorite subjects. Bundlin is handcrafted by Lifely in Amsterdam.',
            'url': $location.protocol() + '://' + $location.host(),
            'site_name': 'Bundlin',
            'image': $location.protocol() + '://' + $location.host() + '/images/bundlin.jpg'
        },

        twitter: {
            'card': 'summary',
            'site': '@bundlin',
            'title': 'Bundlin - The beauty of the web, bundled.',
            'description': 'Create, discover and share Bundles of links about your favorite subjects. Bundlin is handcrafted by Lifely in Amsterdam.',
            'image': $location.protocol() + '://' + $location.host() + '/images/bundlin.jpg',
            'url': $location.protocol() + '://' + $location.host()
        }
    };

    $rootScope.SEO = angular.copy(defaults);

    this.set = function(key, settings) {
        $rootScope.SEO[key] = settings;
    };

    this.setForAll = function(title,description) {
        $rootScope.SEO.title = title;
        $rootScope.SEO.opengraph.title = title;
        $rootScope.SEO.twitter.title = title;

        $rootScope.SEO.description = description;
        $rootScope.SEO.opengraph.description = description;
        $rootScope.SEO.twitter.description = description;
    };

    this.reset = function() {
        $rootScope.SEO = angular.copy(defaults);
    };

});
