app.service('userProfile', function($q, Auth, Restangular) {

    this.refreshAvatar = function() {
        Auth.user().then(function(user) {
            Restangular
                .one('users', user._id)
                .one('refresh_avatar')
                .customPOST({ userId: user._id })
                .then(function () {
                    Auth.user(true);
                });
        });
    }

    this.markNotificationsAsRead = function() {
        var defer = $q.defer();

        Auth.user().then(function(user) {
            Restangular
                .one('users', user._id)
                .one('mark_notifications_read')
                .customPOST({ userId: user._id });
        });

        return defer.promise;
    }

    this.update = Auth.update;
    
});