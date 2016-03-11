/********************************************************* 
	PAGES [with templating lib: Mustache]
*********************************************************/
APP.page = (function () {
    var _topStoriesSelector = document.querySelector('#top-stories'), // Private variables, recommended by Matthias
        _topStorySelector = document.querySelector('#top-story');
    
    var topStories = function (data) {      
        /* Templating with Mustache */
        nanoajax.ajax({
            url: 'assets/templates/top-stories.mst' // Get the template.
        }, function (status, template) {
            if ( status == 200 ) { 
                _topStoriesSelector.innerHTML = Mustache.render(template, data);
            APP.page.toggle();
            }
        });
    };
    
    var topStory = function (data, articleID) {
        /* Filter with Underscore */
        var detailData = _.filter(data, {
            id: articleID
        });
        

        /* Templating with Mustache */
        nanoajax.ajax({
            url: 'assets/templates/top-story.mst' // Get the template.
        }, function (status, template) {
            if ( status == 200 ) { 
                    _topStorySelector.innerHTML = Mustache.render(template, detailData);
                APP.page.toggle();
            }
        });

    };
    
    var toggle = function () {
        var hash = window.location.hash.split('/'),
            route = hash[0],
            sections = document.querySelectorAll('section');
        for (var i = 0; i < sections.length; i++) { // For loop to check all sections.
            sections[i].classList.remove('active'); // add inactive to ALL sections first.             

            if (!route) { // Default route
                sections[0].classList.add('active'); // remove inactive if no hashtag in the link                
            } else {
                document.querySelector(route).classList.add('active'); //remove inactive to the section that corresponds with the hashtag in the link.                    
            }
        }        
    };
    
    return {
        topStories: topStories,
        topStory: topStory,
        toggle: toggle
    }    
    
})();