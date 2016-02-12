/***************************************************
	IIFE
***************************************************/
(function () {
	'use strict';

  /***************************************************
    NAMESPACE
  ***************************************************/
  var APP = APP || { };

	/***************************************************
		GLOBAL VARIABLES
	***************************************************/


	/***************************************************
		Launch the APP.
	***************************************************/
	APP.launch = { 	// Literal object: Launch. Ready for launch?
		init: function () { // Method: function inside a literal object.
            APP.data.get();
		}
	};


	/***************************************************
		The flow of the APP
	***************************************************/

	/***************************************************
		PAGES with (JSON) data, from the NY TIMES.
	***************************************************/
	/*
		HTTPS request: http://api.nytimes.com/svc/topstories/v1/{section}.{response-format}?api-key={your-api-key}
		API KEY: af7f18026c501a31c7a66eea851e85f4:9:74334837
	*/
	APP.data = {
    	get: function () {
			var responseFormat = 'json',
			    storySection = 'technology',
			    apiKey = 'af7f18026c501a31c7a66eea851e85f4:9:74334837',
                apiURL = 'http://api.nytimes.com/svc/topstories/v1/'+storySection+'.'+responseFormat+'?api-key='+apiKey+'';

            /* The Ajax Request (GET) with NanoAjax library */
            var xhrRequest = nanoajax.ajax({
                    url: apiURL,
                    method: 'GET'
            }, function (code, responseText) {
                    var apiData = JSON.parse(responseText);
                    /* Map & Iteratee + unique ID */
                    var data = _.map(apiData.results, function (apiData, iteratee) {
                        apiData.id = _.uniqueId('article_');
                        return apiData;
                    });
                    //console.log(data);
                    APP.router.init(data);
            });
    	}
	};

	/***************************************************
		PAGES with (JSON) data, from the NY TIMES
	***************************************************/
	APP.router = { 	// Literal object: 'router'.
		init: function (data) {
	  		routie({ // Routie checks what come behind the hashtag (#) of the link and selects it.
			    'top-stories': function() {
					APP.router.toggle(window.location.hash); // Toggle sections
                    APP.page.topStories.init(data); // Page templating
			    },
                'top-stories-detail/:id': function(id) {
					APP.router.toggle(window.location.hash.slice(0,19));
                    APP.page.topStoriesDetail.init(data, id);
			    },
			    '*': function() {
					APP.router.toggle(window.location.hash.slice(0,19));
			    }
			});
		},
		toggle: function (route) {
            var sections = document.querySelectorAll('section');
            for (var i = 0; i < sections.length; i++) { // For loop to check all sections.
                sections[i].classList.add('inactive'); // add inactive to ALL sections first.

                if (!route) {  // Default route
                    sections[0].classList.remove('inactive'); // remove inactive if no hashtag in the link
                } else {
                    document.querySelector(route).classList.remove('inactive'); //remove inactive to the section that corresponds with the hashtag in the link.
                }
            }
		}
	};

	APP.page = {
		topStories: {
			init: function (data) {

                /* Directives needed for Transparency to manipulate data-bind */
                var directives = {
                	id: {
                		href: function () {
                            return "#top-stories-detail/" + this.id;
                        },
                		html: function () {
                            return "";
                        }
					},
					multimedia: {
						url: {
    						src: function () {
        						return this.url;
    						}
						}
					}
	            };

	            console.log(data);

                Transparency.render(document.querySelector('[data-route="top-stories"]'), data, directives);

			}
		},
		topStoriesDetail: {
            init: function (data, id) {

                var newID = id;

                /* Filter */
                var detailData = _.filter(data, {id: newID});


                /* Directives needed for Transparency to manipulate data-bind */
                var directives = {
                	id: {
                		html: function () {
                            return "";
                        }
					},
					multimedia: {
						url: {
    						src: function () {
        						return this.url
    						}
						}
					}
	            };

                Transparency.render(document.querySelector('[data-route="top-stories-detail"]'), detailData, directives);
            }
        }
	}; // Close APP.page.

    APP.launch.init(); // Launch the app!

})();


