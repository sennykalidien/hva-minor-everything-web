app.service('modals', function($rootScope, $compile, $q, scrollToggler, $timeout) {

    // find placeholder for all modals
    var modalPlaceholder = $('.bln-modals');

    // store this
    var me = this;

    this.all = [];
    modalPlaceholder.html('');

    // Open a modal
    this.open = function (template, data) {
        var defer = $q.defer();

        var templateName = 'modals/' + template;
        var element = angular.element('<li><partial name="' + templateName + '" scope="partialScope"></partial></li>');
        var modalScope = $rootScope.$new();
        modalScope.partialScope = {};
        modalScope.partialScope.data = data;
        modalScope.partialScope.closeDelay = 0;
        modalScope.partialScope.close = function closeModal (resolveData) {
            modal.element.find('.bln-modalcontainer').addClass('bln-state-leaving');
            $timeout(function () {
                defer.resolve(resolveData);
                modal.element.remove();
                var index = me.all.indexOf(modal);
                if(index > -1) {
                    me.all.splice(index, 1);
                }
                if(me.all.length === 0) {
                    $rootScope.$broadcast('modals:lastmodalcloses');
                }
            }, modal.closeDelay);
        };
        modalScope.partialScope.setCloseDelay = function setCloseDelay (closeDelay) {
            if(typeof closeDelay !== 'number') return 0;
            return modal.closeDelay = closeDelay;
        };

        var modal = {};
        modal.template = template;
        modal.element = $compile(element)(modalScope);
        modal.scope = modal.element.scope();
        modal.closeDelay = 0;

        me.all.push(modal);
        modalPlaceholder.append(modal.element);

        if(me.all.length === 1) {
            $rootScope.$broadcast('modals:firstmodalopens');
        }

        return defer.promise;
    };

    this.checkCurrentlyOpen = function checkCurrentlyOpen (template) {
        return !! _.find(me.all, { template: template });
    };

    // Function to clean up all modals
    this.cleanUp = function cleanUp () {
        _.each(me.all, function (modal) {
            modal.scope.close();
        });
    };

});
