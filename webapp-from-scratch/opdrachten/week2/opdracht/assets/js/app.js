/*************************************************** 
	NAMESPACE 
***************************************************/
var APP = APP || { };

/*************************************************** 
	IIFE 
***************************************************/
(function () {
	'use strict';


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
                    var data = JSON.parse(responseText);                       
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
                'top-stories-detail/:title': function(title) {
					APP.router.toggle(window.location.hash.slice(0,19));
                    APP.page.topStoriesDetail.init(data, title);	
			    },				        
			    '*': function() {
					APP.router.toggle(window.location.hash.slice(0,19));					
			    }
			});
		},	
		toggle: function (route) { 
            var sections = document.querySelectorAll("section");     		           
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
    			/*
    			var responseFormat = 'json',
    			    storySection = 'technology',
    			    apiKey = 'af7f18026c501a31c7a66eea851e85f4:9:74334837',
                    apiURL = 'http://api.nytimes.com/svc/topstories/v1/'+storySection+'.'+responseFormat+'?api-key='+apiKey+'';                                                         
                
                /* The Ajax Request (GET) with NanoAjax library */ /*
                var xhrRequest = nanoajax.ajax({
                        url: apiURL,
                        method: 'GET'
                }, function (code, responseText) {
                        APP.data.input = JSON.parse(responseText);
                        return data;
                        console.log(data);                        
                        Transparency.render(document.querySelector('[data-route="top-stories"]'), data, directives);                        
                });
                */

                /* Directives needed for Transparency to manipulate data-bind */
                var directives = {
                    results: {
                    	title: {
                    		href: function () {
                                return "#top-stories-detail/" + this.title.replace(/\s+/g, '-').replace(/,/g, '').toLowerCase();
                            }          	     
						},
						multimedia: {
    						url: {
        						src: function () {
            						return this.url
        						}
    						}	
						}							
					}
	            };
	            
                Transparency.render(document.querySelector('[data-route="top-stories"]'), data, directives); 
                
			}		 
		}, 
		topStoriesDetail: {			    		    	
            init: function (data, title) {
            /*
            var detailURL = window.location.toString(),                    
                            split = detailURL.split("/"),
                            detailTitle = split[split.length - 1]; 
                            console.log(detailTitle);
            */
                
                               
                var newTitle = title.replace(/-/g, ' ').replace(/\b./g, function(m){ return m.toUpperCase(); });
                
                /* Filter */
                var detailData = _.filter(data.results, {title: newTitle});

                /* Find Where */                
                var newData = _.map(data.results, function(obj) {
                    return obj.title;
                });                                                  

                /* Directives needed for Transparency to manipulate data-bind */
                var directives = {
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


