app.service('error', function($state) {

    //
    this.status = function(status) {
        switch(status) {
            case 404:
                $state.go('app.error', {
                    bundleId: 404
                });
                break;
        }
    };

});