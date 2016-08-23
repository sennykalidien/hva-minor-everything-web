app.directive('modalCustomArticleImage', function (Auth, Restangular, debouncedEvents) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            
            scope.setCloseDelay(500);
            scope.loading = {
                suggestions: false
            };

            var form = elm.find('#imageForm');

            /***********************************************************************************************/
            /* Current chosen picture */
            /***********************************************************************************************/
            scope.picture = {
                type: 'none',
                data: {}
            };

            scope.unsetPicture = function () {
                scope.picture.type = 'none';
                scope.picture.data = {};
                form[0].reset();
            };

            /***********************************************************************************************/
            /* Close modal if screen is small than 990 */
            /***********************************************************************************************/
            var previousWidth = window.innerWidth;
            var resizeEventid = debouncedEvents.onResize(function () {
                if(window.innerWidth < 990 && previousWidth >= 990) {
                    scope.close();
                }
            });
            scope.$on('$destroy', function () {
                debouncedEvents.off(resizeEventid);
            });

            /***********************************************************************************************/
            /* Suggestions */
            /***********************************************************************************************/
            scope.suggestions = [];
            scope.loading.suggestions = true;
            Restangular
                .one('bundles', scope.data.bundle._sid)
                .one('items', scope.data.item._sid)
                .customGET('suggestimages')
                .then(function (response) {
                    scope.suggestions = response.data.slice(0, 8);
                })
                .finally(function () {
                    scope.loading.suggestions = false;
                });

            scope.setPictureBySuggestion = function (suggestion) {
                scope.picture.type = 'suggestion';
                scope.picture.data = {
                    url: suggestion.imageUrl
                };
                _.defer(function () { scope.$apply(); });
            };

            /***********************************************************************************************/
            /* Upload */
            /***********************************************************************************************/
            var imageFileInput = elm.find('#imageFileUploadButton');
            imageFileInput.on('change', function (event) {
                scope.picture.data = {};
                var file = event.target.files[0];

                if(!file) {
                    scope.imageBase64Valid = false;
                } else {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        var contents = event.target.result;
                        if(file.type.indexOf('image') === -1) {
                            scope.imageBase64Valid = false;
                        } else {
                            scope.imageBase64Valid = true;
                            scope.imageBase64 = contents;
                            scope.setPictureByUpload(file);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });

            scope.imageBase64Valid = false;
            scope.imageBase64 = '';
            scope.setPictureByUpload = function (file) {
                scope.picture.type = 'upload';
                scope.picture.data = {
                    base64: scope.imageBase64,
                    file: file
                };
                _.defer(function () { scope.$apply(); });
            };

            /***********************************************************************************************/
            /* Custom URL */
            /***********************************************************************************************/
            scope.imageURLValid = false;
            scope.imageURL = '';
            scope.setPictureByUrl = function () {
                scope.picture.type = 'url';
                scope.picture.data = {
                    url: scope.imageURL
                };
                _.defer(function () { scope.$apply(); });
            };

            var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            scope.$watch('imageURL', function (url) {
                scope.imageURLValid = urlRegex.test(url);
            });

        }
    };
});