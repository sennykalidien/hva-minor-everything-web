app.factory('Auth', function($q, Restangular, $analytics, $interval, $state, modals) {

    var SESSION_CALLS_DEBOUNCE = 50;
    var sessionBase = Restangular.one('session');
    var User = {
        loggedIn: false,
        hasRole: function hasRole (role) {
            if(!this.loggedIn) return false;
            var roles = arguments || [role];
            var matches = _.intersection(roles, this.roles);
            return matches.length > 0;
        },
        hasUnreadNotifications: function hasUnreadNotifications(){
            return _.some(this.notifications, {'read': false});
        }
    };
    var defaultUserProperties = Object.keys(User);
    var checkForNewNotificationsIntervalId;
    var NOTIFICATION_CHECK_INTERVAL = 30 * 1000; // 30 seconds

    /***********************************************************************************************/
    /* Auth service API */
    /***********************************************************************************************/
    var Auth = {
        user: function (force) {
            var defer = $q.defer();

            // If User is unknown or force is enabled, perform a session call
            if(!User.loggedIn || force) {

                defersArray.push(defer);
                debouncedSessionCall();

            // Otherwise, directly resolve with current User
            } else {
                defer.resolve(User);
            }

            // Return promise
            return defer.promise;
        },

        login: function () {
            var defer = $q.defer();
            $analytics.eventTrack('System', { category: 'Auth', label: 'Login with Twitter' });

            // Twitter login popup settings
            var settings = {
                'height': 420,
                'width': 550,
                'left': (window.innerWidth - 550) / 2,
                'top': 150,
                'toolbar': 0,
                'status': 0
            };

            // Stringify settings
            var windowSettingsString = Object.keys(settings).map(function(key) {
                return key + '=' + settings[key];
            }).join(',');

            // Open the popup
            var popup = window.open('/api/auth/twitter', 'Bundlin - Login with Twitter', windowSettingsString);

            // Focus the popup
            if (window.focus) popup.focus();

            // Callback function to be executed by popup's JavaScript
            window.doBundlinTwitterLogin = function (userData) {
                popup.close();

                var handle = function (newUser) {
                    mergeUserWith(newUser);
                    User.loggedIn = true;
                    defer.resolve(User);
                    checkUserMail();
                };

                if(userData) {
                    handle(userData);
                } else {
                    Auth.user(true)
                        .then(function (response) {
                            handle(response.data);
                        });
                }
            };

            // Return promise
            return defer.promise;
        },

        logout: function () {

            // Perform call, return promise
            return Restangular.one('auth').one('logout').post().then(function(response) {
                cleanUpUser();
                $state.go('app.home');
            });
        },

        updateLocal: function (data) {
            mergeUserWith(data);
            return User;
        },

        update: function (data) {
            var defer = $q.defer();

            Auth.user().then(function(user) {
                Restangular
                    .one('users', user._id)
                    .patch(data)
                    .then(function (response) {
                        Auth.updateLocal(data);
                        defer.resolve(User);
                    }, function (error) {
                        defer.reject(error);
                    });
            });

            return defer.promise;
        }
    };

    /***********************************************************************************************/
    /* Debounced session call logic */
    /***********************************************************************************************/
    var defersArray = [];
    var sessionCall = function () {
        sessionBase.get().then(function (response) {
            var newUser = response.data;
            mergeUserWith(newUser);
            User.loggedIn = true;
            checkUserMail();
            $interval.cancel(checkForNewNotificationsIntervalId);
            var checkForNewNotificationsIntervalId = $interval(debouncedNotificationsCall, NOTIFICATION_CHECK_INTERVAL);

            _.each(defersArray, function (defer) {
                defer.resolve(User);
            });
            defersArray = [];

        }, function () {
            cleanUpUser();
            _.each(defersArray, function (defer) {
                defer.resolve(User);
            });
            defersArray = [];
        });
    };
    var debouncedSessionCall = _.debounce(sessionCall, SESSION_CALLS_DEBOUNCE);


    /***********************************************************************************************/
    /* Auth helper functions */
    /***********************************************************************************************/
    var mergeUserWith = function mergeUserWith (newUser) {
        _.each(newUser, function (value, key) {
            User[key] = value;
        })
    };

    var cleanUpUser = function cleanUpUser () {
        User.loggedIn = false;
        _.each(User, function (value, key) {
            if(defaultUserProperties.indexOf(key) === -1) {
                delete User[key];
            }
        });
    };

    var checkUserMail = function checkUserMail () {
        if(!User.email && !modals.checkCurrentlyOpen('modal-ask-email')) {
            modals.open('modal-ask-email', { user: User });
        }
    };

    var checkForNewNotifications = function checkForNewNotifications () {
        if(!User.loggedIn) return;

        Restangular
            .one('users', User._id)
            .all('unreadnotifications')
            .getList()
            .then(function (response) {
                var newNotifications = response.data || [];
                User.notifications = _.filter(User.notifications, { read: true } );
                User.notifications = newNotifications.concat(User.notifications);
            });
    };
    var debouncedNotificationsCall = _.debounce(checkForNewNotifications, 500);

    return Auth;

});
