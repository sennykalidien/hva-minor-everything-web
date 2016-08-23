app.directive('settings', function(userProfile, Auth, sideextensions, $rootScope) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
            var currentState = 'profile',
                expanded = true;

            scope.userProfile = undefined;
            scope.inputErrors = {};
            scope.expand = function(state){
                element.find('.bln-state-open').removeClass('bln-state-open');
                element.find('.' + state).addClass('bln-state-open');
            }

            var formError = function formError(formElm, key, errorMessage){
                scope.inputErrors[key] = errorMessage;
                formElm.addClass('bln-state-error');
            }

            var formSuccess = function formError(formElm, key){
                scope.inputErrors[key] = '';
                formElm.removeClass('bln-state-error');
            }

            var patchData = function patchData(formElm, value, key) {
                var patchData = {};
                patchData[key] = value;
                userProfile.update(patchData).then(function () {
                    formSuccess(formElm, key);
                }, function(err) {
                    var errMessage = err.data.message;
                    if(err.status !== 400 || !errMessage) {
                        errMessage = 'Whoops, something went wrong with this'
                    }
                    if(err && err.data) {
                        formError(formElm, key, errMessage);
                    }
                });
            }

            scope.submitProfile = function(value, key, $event) {
                var formElm = angular.element($event.target);

                patchData(formElm, value, key);

                /*if(key === 'spiritgif'){
                    $.ajax({
                        type: "HEAD",
                        async: true,
                        url: value,
                        success: function(message,text,response){
                            var contentType = response.getResponseHeader('Content-Type');
                            if(contentType === 'image/gif'){
                                patchData(formElm, value, key);
                            } else {
                                scope.$apply(function(){formError(formElm, key, 'The image has to be a .gif');});
                            }
                        },
                        error: function(){
                            scope.$apply(function(){formError(formElm, key, 'The image has to be a .gif');});
                        }
                    });
                } else {
                    patchData(formElm, value, key);
                }*/
            }

            scope.refreshAvatar = function () {
                userProfile.refreshAvatar();
            };

            scope.logout = function() {
                Auth.logout().then(function () {
                    sideextensions.disableAll();
                }, function (){

                });
            };
            Auth.user()
                .then(function(user) {
                    scope.userProfile = user;

                });

            scope.$on('$destroy', function(){
                $rootScope.$broadcast('bln:profileUpdated', {username:scope.userProfile.username});
            });
        }
    }
});