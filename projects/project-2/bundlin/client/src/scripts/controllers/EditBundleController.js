app.controller('EditBundleController', function($scope, $rootScope, $state, $stateParams, FileUploader, Auth, Restangular, $interval, $q, helpers, tags, $location, modals, toastr, SEO, $document) {

    /***********************************************************************************************/
    /* Page */
    /***********************************************************************************************/
    $rootScope.stateTransition.time = 350;
    $scope.Math = window.Math;
    $scope.loading = {
        page: true,
        scraper: false,
        new_quote: false,
        bundle: false,
        suggestion: false
    };
    $scope.scraperError = {
        active: false,
        message: '',
        timer: 0,
        intervalPromise: {}
    };
    var SCRAPER_ERROR_LIFETIME = 5; // seconds
    $scope.tweet = {
        content: ''
    };

    /***********************************************************************************************/
    /* Bundle */
    /***********************************************************************************************/
    var bundleBase = Restangular.one('bundles', $stateParams.bundleId);
    $scope.bundle = {};
    $scope.bundleTags = [];
    $scope.publishedItems = [];
    $scope.archivedItems = [];
    $scope.user = {};
    $scope.bundleValid = {
        valid: false,
        messages: []
    };
    $scope.creatorTwitterHandles = [];
    $scope.PROGRESSBAR_PUBLISH_TRESHOLD = 80;
    $scope.progress = 0;

    Auth.user()
        .then(function (user) {
            $scope.user = user;
        });

    // Get bundle
    $q.all([
            bundleBase.get(),
            Auth.user()
        ])
        .then(function(responses) {
            var bundle = responses[0].data;
            $scope.user = responses[1];

            if($scope.user.loggedIn && (bundle.author._id === $scope.user._id || $scope.user.hasRole('admin'))) {
                handleBundleData(bundle);
            } else {
                $state.go('app.error', { status: '404' });
            }
        }, function () {
            $state.go('app.error', { status: '404' });
        }).finally(function () {
            $scope.loading.page = false;
        });

    // Get tags
    $scope.loadTagsForTagsInput = function($query){
        return tags.load($query);
    };

    // Set SEO
    SEO.setForAll('Create a Bundle', 'You can use all sorts of web content, don\'t forget to come up with a compelling title and use an amazing cover photo.')

    // Handle bundle data
    var handleBundleData = function handleBundleData (bundle) {
        $scope.bundleTags = $scope.transformTagsForUI(bundle.tags);
        hydrateBundle(bundle);
        $scope.bundle = bundle;
        itemMaintenance($scope.bundle);
        if($scope.bundleValid && $scope.bundleValid.valid) {
            fillTweet();
        }
    };

    // Hydrate bundle
    var hydrateBundle = function hydrateBundle (bundle) {

        // Bundle cover image uploader
        bundle.imageUploader = new FileUploader({
            url: '/api/bundles/' + bundle._sid + '/picture',
            autoUpload: true,
            removeAfterUpload: true,
            onSuccessItem: function (uploaditem, response, status) {
                if(status === 200 && response && response.data && response.data[0]) {
                    bundle.picture = response.data[0];
                    bundle.uploaded_user_image = true;
                    runBundleValidation();
                }
            },
            onErrorItem: function(uploaditem, response, status, headers) {
                if(status === 413) {
                    toastr.error('Ooops! We couldn\'t process this immense picture.');
                    return;
                }
                if(response.message) {
                    toastr.error(response.message);
                }
            },
            onBeforeUploadItem: function () {
                bundle.loading.changepicture = true;
            },
            onCompleteItem: function () {
                bundle.loading.changepicture = false;
            }
        });

        // Loading states
        bundle.loading = {
            changepicture: false,
            tweeting: false
        };

        // Picture focus point defaults
        if(!bundle.picture.focus_x) bundle.picture.focus_x = 50;
        if(!bundle.picture.focus_y) bundle.picture.focus_y = 50;

        // Update bundle focuspoint callback
        bundle.setFocusPoint = function (x, y) {
            var newPicture = bundle.picture;
            newPicture.focus_x = x;
            newPicture.focus_y = y;
            $scope.updateBundle({
                picture: newPicture
            });
        };

        // Hydrate bundle items
        _.each(bundle.items, function (item) {
            hydrateItem(item, bundle._sid);
        });
    };

    // Hydrate invididual bundle item
    var hydrateItem = function hydrateItem (item, bundleSid) {

        // Initiate uploader when type=article
        if(item.type === 'article') {
            item.imageUploader = new FileUploader({
                url: '/api/bundles/' + bundleSid + '/items/' + item._sid + '/picture',
                autoUpload: false,
                removeAfterUpload: true,
                onSuccessItem: function (uploaditem, response, status, headers) {
                    if(status === 200 && response && response.data && response.data[0]) {
                        item.fields.picture = response.data[0];
                        item.fields.selected_crawled_image_index = -1;
                    }
                },
                onBeforeUploadItem: function () {
                    item.loading.changepicture = true;
                },
                onCompleteItem: function () {
                    item.loading.changepicture = false;
                },
                onErrorItem: function(uploaditem, response, status, headers) {
                    if(status === 413) {
                        toastr.error('Ooops! We couldn\'t process this immense picture.');
                        return;
                    }
                    if(response.message) {
                        toastr.error(response.message);
                    }
                }
            });

            item.loading = {
                changepicture: false
            };
        }
    };

    // Re-assign all published bundle item order indices
    var reAssignOrder = function reAssignOrder (bundle) {
        _.chain(bundle.items)
            .filter('active')
            .sortBy('order')
            .each(function (item, index) {
                item.order = index + 1;
            });
    };

    // Create filtered bundle items
    var updatePublicArchivedArrays = function updatePublicArchivedArrays (bundle) {
        $scope.publishedItems = _.filter(bundle.items, { active: true });
        $scope.archivedItems = _.filter(bundle.items, { active: false });
    };

    // Update bundle action
    $scope.updateBundle = function(data) {
        $scope.loading.bundle = true;
        return bundleBase.patch(data).then(function() {
            _.merge($scope.bundle, data);
            runBundleValidation()
        }).finally(function () {
            $scope.loading.bundle = false;
        });
    };

    // Update bundle tags
    var debouncedUpdateTags = _.debounce(function (bundleTags) {
        $scope.loading.suggestion = true;
        var transformedTags = $scope.transformTagsForSubmission(bundleTags);
        $scope.updateBundle({
            tags: transformedTags
        });
    }, 1500);
    $scope.updateTags = function (bundleTags) {
        debouncedUpdateTags(bundleTags);
    };

    var fillTweet = function fillTweet () {
        var title = $scope.bundle.title;
        var url = $location.host() + '/' + $scope.bundle._sid;
        url = url.replace('bundlin', 'Bundlin');

        $scope.tweet.content = [
            title,
            'on',
            url
        ].join(' ');
    };

    var updateCreatorTwitterHandles = function updateCreatorTwitterHandles () {
        var bundle = $scope.bundle;
        if(!bundle || !bundle.items || !bundle.items.length) return;

        $scope.creatorTwitterHandles = [];
        _.each(bundle.items, function (item) {
            switch(item.type) {
                case 'article':
                    if(item.fields && item.fields.creator && item.fields.creator.twitter && item.fields.creator.twitter.username && item.fields.creator.twitter.username.length > 0 && $scope.creatorTwitterHandles.indexOf(item.fields.creator.twitter.username) === -1)
                        $scope.creatorTwitterHandles.push(item.fields.creator.twitter.username);
                    break;
                case 'twitter_profile':
                    if(item.fields && item.fields.username && item.fields.username.length > 0 && $scope.creatorTwitterHandles.indexOf(item.fields.username) === -1)
                        $scope.creatorTwitterHandles.push(item.fields.username);
                    break;
                case 'twitter_tweet':
                    if(item.fields && item.fields.author && item.fields.author.username && item.fields.author.username.length > 0 && $scope.creatorTwitterHandles.indexOf(item.fields.author.username) === -1)
                        $scope.creatorTwitterHandles.push(item.fields.author.username);
                    break;
            }
        });
    };

    /***********************************************************************************************/
    /* Data transforms */
    /***********************************************************************************************/
    $scope.transformTagsForUI = function (tags) {
        return _.map(tags, function (tag) {
            return {
                text: tag
            };
        });
    };
    $scope.transformTagsForSubmission = function (tags) {
        // Retrieve suggestions based on provided tags
        $scope.suggestImages(tags);

        return _.map(tags, function (tag) {
            return tag.text;
        });
    };

    /***********************************************************************************************/
    /* Image Suggestions */
    /***********************************************************************************************/
    $scope.suggestImages = function (tags) {
        // Check if there is at least 1 tag to avoid crashes
        if (tags.length < 1) return;

        var tagArray = [];
        tags.forEach(function (tag) {
            tagArray.push(tag.text);
        });

        $scope.bundle.loading.changepicture = false;
        bundleBase
            .customPOST({ tags: tagArray }, 'updatesuggestions')
            .then(function(response) {
                var pictureObject = Restangular.stripRestangular(response.data);
                $scope.bundle.picture = pictureObject;
                runBundleValidation();
            })
            .finally(function () {
                $scope.bundle.loading.changepicture = false;
            });
    };

    $scope.nextSuggestion = function () {
        $scope.bundle.loading.changepicture = true;
        bundleBase
            .post('nextsuggestion')
            .then(function(response) {
                var pictureObject = Restangular.stripRestangular(response.data);
                $scope.bundle.picture = pictureObject;
                $scope.bundle.uploaded_user_image = false;
                runBundleValidation();
            })
            .finally(function () {
                $scope.bundle.loading.changepicture = false;
            });
    };

    $scope.previousSuggestion = function () {
        $scope.bundle.loading.changepicture = true;
        bundleBase
            .post('previoussuggestion')
            .then(function(response) {
                var pictureObject = Restangular.stripRestangular(response.data);
                $scope.bundle.picture = pictureObject;
                $scope.bundle.uploaded_user_image = false;
                runBundleValidation();
            })
            .finally(function () {
                $scope.bundle.loading.changepicture = false;
            });
    };

    $scope.unsetCoverimage = function () {
        $scope.bundle.loading.changepicture = true;
        $scope.updateBundle({ picture: {} })
            .then(function () {
                $scope.bundle.picture = {};
                $scope.bundle.uploaded_user_image = false;
                runBundleValidation();
            })
            .finally(function () {
                $scope.bundle.loading.changepicture = false;
            });
    };

    /***********************************************************************************************/
    /* Publish and restrictions */
    /***********************************************************************************************/
    $scope.publishBundle = function(tweetContent) {
        if(tweetContent.length > 140) return false;
        $scope.bundle.loading.tweeting = true;
        _.defer(function () { $scope.$apply() });

        var publish = function () {
            $scope.loading.bundle = true;
            var data = {
                tweet: tweetContent
            };
            bundleBase.customPOST(data, 'publish').then(function() {
                $scope.bundle.published = true;
                $state.go('app.view_bundle', { bundleId: $scope.bundle._sid });
            }, function(response) {
                if(response.status === 409) {
                    toastr.error('Publishing bundle failed, duplicate tweet found on timeline');
                } else if (response.status === 400) {
                    toastr.error(response.data.message);
                } else {
                    toastr.error('Publishing bundle failed');
                }
            }).finally(function () {
                $scope.bundle.loading.tweeting = false;
                $scope.loading.bundle = false;
            });
        };

        if(!$scope.user.twitter_write) {
            Auth.login().then(function () {
                $scope.user.twitter_write = true;
            })
            .finally(publish);
        } else {
            publish();
        }
    };
    $scope.unpublishBundle = function() {
        $scope.loading.bundle = true;
        bundleBase.customDELETE('publish').then(function() {
            $scope.bundle.published = false;
        }).finally(function () {
            $scope.loading.bundle = false;
        });
    };
    var PROGRESS_VALID_MIN = 80;
    var validProgress = 0;
    var validProgressMax = 9; // title + description + tags + picture + 5 items = 9 total;
    var progress = 0;
    var progressMax = 12; // title + description + tags + picture + 8 items = 12 total;

    $scope.bundleValidations = {
        title: false,
        description: false,
        tags: false,
        picture: false,
        items: false
    };

    var updateProgress = function updateProgress(){
        if(validProgress <= validProgressMax && !$scope.bundleValid.valid){
            $scope.progress = Math.ceil((PROGRESS_VALID_MIN / validProgressMax) * validProgress);
        } else {
            $scope.progress = PROGRESS_VALID_MIN + (Math.ceil(20 / 3) * (progress - validProgress));
        }
    }

    var validateBundle = function validateBundle(bundle) {
        if(!bundle) {
            return {
                valid: false,
                messages: ['no bundle found']
            };
        }
        $scope.bundleValidations = {
            title: false,
            description: false,
            tags: false,
            picture: false,
            items: false
        };
        var valid = true;
        var messages = [];

        progress = 0;
        validProgress = 0;

        if (bundle.title ) {
            if(bundle.title.length < 5 || bundle.title.length > 50) {
                valid = false;
                messages.push('title length incorrect');
            } else {
                $scope.bundleValidations.title = true;
                validProgress += 1;
                progress += 1;
            }

        } else {
            valid = false;
            messages.push('title is required');
        }
        if (bundle.description) {
            if(bundle.description.length < 30 || bundle.description.length > 250) {
                valid = false;
                messages.push('description length incorrect');
            } else {
                $scope.bundleValidations.description = true;
                validProgress += 1;
                progress += 1;
            }
            //EntityValidator.validate(bundle.description, 'Bundle description', 'required|length:min=30,max=250');
        } else {
            valid = false;
            messages.push('description is required');
        }

        if (bundle.tags) {
            if(bundle.tags.length < 1 || bundle.tags.length > 4) {
                valid = false;
                messages.push('number of tags is incorrect');
            } else {
                $scope.bundleValidations.tags = true;
                validProgress += 1;
                progress += 1;
            }
            //EntityValidator.validate(bundle.tags, 'Bundle tags', 'required|length:min=1,max=4');
        } else {
            valid = false;
            messages.push('tags are required');
        }

        if (bundle.items) {
            $scope.bundleValidations.items = true;
            if(_.filter(bundle.items, 'active').length < 5 || _.filter(bundle.items, 'active').length > 8) {
                messages.push('number of items is incorrect');
                valid = false;
                $scope.bundleValidations.items = false;
            }

            validProgress += _.filter(bundle.items, 'active').length < 5 ? _.filter(bundle.items, 'active').length : 5;
            progress += _.filter(bundle.items, 'active').length < 8 ? _.filter(bundle.items, 'active').length : 8;
            
            //EntityValidator.validate(items, 'Bundle items', 'length:min=5,max=8');
            //TODO: this.validateMaximalOne(items, ['quote', 'googlemaps', 'vimeo', 'youtube', 'twitter_tweet', 'twitter_profile', 'soundcloud', 'dribbble']);

        } else {
            valid = false;
            messages.push('items are required');
        }

        if (bundle.picture && bundle.picture.original) {
            $scope.bundleValidations.picture = true;
            validProgress += 1;
            progress += 1;

        } else {
            valid = false;
            messages.push('cover images is required');
        }

        return {
            valid: valid,
            messages: messages
        };
    };

    $scope.addHandleToTweet = function addHandleToTweet (handle) {
        if($scope.tweet.content.indexOf('→') === -1) {
            $scope.tweet.content += ' →';
        }
        $scope.tweet.content += ' ' + handle;
    };

    function runBundleValidation() {
        if(!$scope.bundle) return;
        $scope.bundleValid = validateBundle($scope.bundle);
        updateProgress();
    }

    $scope.$watch('bundleValid', function (newValue, oldValue) {
        if(newValue.valid && !oldValue.valid) {
            fillTweet();
        }
    }, true);

    /***********************************************************************************************/
    /* Delete */
    /***********************************************************************************************/
    $scope.deleteBundle = function() {
        if(confirm('Are you sure you want to delete this bundle?')) {
            bundleBase.remove().then(function() {
                $state.go('app.home');
            });
        }
    };

    /***********************************************************************************************/
    /* Item actions */
    /***********************************************************************************************/
    $scope.updateItem = function updateItem (item, data) {
        item.loading = true;
        return bundleBase.one('items', item._sid).patch(data).then(function() {
            _.merge(item, data);
        }).finally(function () {
            item.loading = false;
        });
    };

    $scope.deleteItem = function deleteItem (item) {
        item.loading = true;
        bundleBase.one('items', item._sid).remove().then(function() {
            $scope.bundle.items = _.without($scope.bundle.items, item);
            itemMaintenance($scope.bundle);
        }, function () {
            item.loading = false;
        });
    };

    $scope.archiveItem = function archiveItem (item) {
        $scope.updateItem(item, { active: false }).finally(function () {
            item.order = 0;

            itemMaintenance($scope.bundle);
        });
    };

    $scope.publishItem = function publishItem (item) {
        $scope.updateItem(item, { active: true }).finally(function () {
            var lastOrderItem = _.max($scope.bundle.items, 'order');
            if(lastOrderItem && lastOrderItem.order) {
                item.order = lastOrderItem.order + 1;
            } else {
                item.order = 1;
            }

            itemMaintenance($scope.bundle);
        });
    };

    $scope.moveItem = function moveItem(item, relativePosition) {
        if(!item.active) return;

        var sortedItems = _.sortBy($scope.bundle.items, 'order'),
            old_index = sortedItems.indexOf(item),
            new_index = old_index + relativePosition;

        var reSortedItems = helpers.moveItemThroughArray(sortedItems, old_index, new_index);
        var idsInOrder = _.pluck(reSortedItems, '_id');

        bundleBase.post('items/order', {ids: idsInOrder}).then(function(response) {

            var orderObject = response.data;
            _.each($scope.bundle.items, function(item) {
                item.order = orderObject[item._id];
            });

        });

    };

    var uploadItemImageByUrl = function uploadItemImageByUrl (item, url) {
        var defer = $q.defer();
        if (! url || ! item) {
            // _.defer(function () {
            //     defer.reject();
            // });
            // return defer.promise;
            return false;
        }

        item.loading.changepicture = true;
        bundleBase
            .one('items', item._sid)
            .customPOST({ picture: url }, 'picture')
            .then(function (response) {
                var picture = Restangular.stripRestangular(response.data);
                item.fields.picture = picture;
                item.fields.selected_crawled_image_index = -1;
                defer.resolve();
            }, function () {
                defer.reject();
            })
            .finally(function () {
                item.loading.changepicture = false;
            });

        return defer.promise;
    };

    var uploadItemImageByFile = function uploadItemImageByFile (item, file) {
        var Uploader = item.imageUploader;
        Uploader.addToQueue(file);
        Uploader.uploadAll();
    };

    var setCrawledImage = function setCrawledImage (item, index) {
        var url = item.fields.pictures[index];
        if(item && url) {
            uploadItemImageByUrl(item, url).then(function () {
                item.fields.selected_crawled_image_index = index;
            });
        }
    };

    $scope.selectPreviousCrawledImage = function selectPreviousCrawledImage (item) {
        var currentIndex = item.fields.selected_crawled_image_index || 0,
            newIndex = currentIndex - 1;

        if(newIndex < 0) {
            newIndex = item.fields.pictures.length - 1;
        }

        setCrawledImage(item, newIndex);
    };

    $scope.selectNextCrawledImage = function selectNextCrawledImage (item) {
        var currentIndex = item.fields.selected_crawled_image_index || 0,
            newIndex = currentIndex + 1;

        if(newIndex > item.fields.pictures.length - 1) {
            newIndex = 0;
        }

        setCrawledImage(item, newIndex);
    };

    $scope.closeCustomImage = function closeCustomImage (item) {
        if(item.fields.pictures.length) {
            $scope.selectNextCrawledImage(item);
        }
    };

    $scope.selectCustomImage = function selectCustomImage (item) {
        if(!modals.checkCurrentlyOpen('modal-custom-article-image')) {
            modals.open('modal-custom-article-image', {
                bundle: $scope.bundle,
                item: item
            }).then(function (responseData) {
                if(!responseData || !responseData.data) return;
                if(responseData.data.url) {
                    uploadItemImageByUrl(item, responseData.data.url);
                } else if (responseData.data.file) {
                    uploadItemImageByFile(item, responseData.data.file);
                }
            });
        }
    };

    /***********************************************************************************************/
    /* Add new scraper item */
    /***********************************************************************************************/
    $scope.newItemUrl = '';
    $scope.newItemSubmit = function newItemSubmit ($event) {
        $event.originalEvent.preventDefault();
        if(!$scope.newItemUrl || $scope.loading.scraper) return false;

        // Add item to bundle
        $scope.closeScraperError();
        $scope.loading.scraper = true;
        bundleBase.post('items/scrape', {
            active: true,
            url: $scope.newItemUrl
        }).then(function(response) {
            if(!response || !response.data) return;

            // Save new item
            var newItem = response.data;
            hydrateItem(newItem, $stateParams.bundleId);
            $scope.bundle.items.push(newItem);
            itemMaintenance($scope.bundle);
            _.defer(function () {
                $document.scrollTo($('.bln-sub-publisheditem:last-of-type'), 100, 500);
            });

            // Reset form
            this.newItemForm.$error    = {};
            this.newItemForm.$pristine = true;
            this.newItemForm.$dirty    = false;
            this.newItemForm.$valid    = true;
            this.newItemForm.$invalid  = false;
            $scope.newItemUrl = '';

        }, function() {

            // New scraper error
            setScraperError('We are unable to load this item, please check your link');

        }).finally(function () {
            $scope.loading.scraper = false;
        });

        return false;
    };

    var itemMaintenance = function itemMaintenance(bundle) {
        reAssignOrder($scope.bundle);
        updatePublicArchivedArrays($scope.bundle);
        runBundleValidation();
        updateCreatorTwitterHandles();
    }

    var setScraperError = function setScraperError (message) {
        $scope.scraperError = {
            active: true,
            message: message,
            timer: 5,
            intervalPromise: $interval(function() {
                $scope.scraperError.timer --;
                if($scope.scraperError.timer <= 0) {
                    $scope.closeScraperError();
                }
            }, 1000)
        };

        $scope.$on('$destroy', function () {
            $interval.cancel($scope.scraperError.intervalPromise);
        });
    };

    $scope.closeScraperError = function closeScraperError () {
        $interval.cancel($scope.scraperError.intervalPromise);
        $scope.scraperError = {
            active: false,
            message: '',
            timer: 0,
            intervalPromise: {}
        };
    };

    /***********************************************************************************************/
    /* Add new quote item */
    /***********************************************************************************************/
    $scope.createEmptyQuote = function() {

        $scope.loading.new_quote = true;
        bundleBase.post('items', {
            active: true,
            type: 'quote',
            fields: {
                'quote': '',
                'quote_author': ''
            }
        }).then(function(response) {
            if(!response || !response.data) return;

            // Save new item
            var newItem = response.data;
            $scope.bundle.items.push(newItem);
            itemMaintenance($scope.bundle);
            _.defer(function () {
                $('.bln-sub-publisheditem:last-of-type .bln-input-smallform-quote').focus();
            });

        }).finally(function () {
            $scope.loading.new_quote = false;
        });
    };

});
