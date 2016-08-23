app.service('sideextensions', function($rootScope, scrollToggler, $timeout) {

    var self = this;

    this.all = {};

    this.register = function(name, defaultstate) {
        var defaultstate = defaultstate || false;
        var destroyer;
        var sideextension = {
            state: false,
            name: name,
            render: false,
            close: function(){
                if(!sideextension.state) return;
                destroyer = $timeout(function(){
                    sideextension.render = false;
                }, 500);
                sideextension.state = false;
                scrollToggler.enable();
                $rootScope.$broadcast('sideExtensionChange', false);
                return true;
            },
            open: function() {
                $timeout.cancel(destroyer);
                sideextension.render = true;
                self.disableAll();
                sideextension.state = true;
                scrollToggler.disable();
                $rootScope.$broadcast('sideExtensionChange', true);
                return true;
            },
            toggle: function() {
                sideextension.state ? sideextension.close() : sideextension.open();
                return true;
            }
        };

        return self.all[name] = sideextension;
    };

    this.disableAll = function() {
        _.each(self.all, function(sideextension) {
            sideextension.close();
        });
    };

});
