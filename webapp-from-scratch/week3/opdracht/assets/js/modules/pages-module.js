/********************************************************* 
	PAGES [with templating lib: Mustache]
*********************************************************/
APP.page = (function () {
    var topStories = function (data) {
        /* Templating with Mustache */
        nanoajax.ajax({
            url: 'assets/templates/top-stories.mst' // Get the template.
        }, function (code, template) {
            document.querySelector('#top-stories').innerHTML = Mustache.render(template, data);
        });
    };
    
    var topStory = function (data, articleID) {
        /* Filter with Underscore */
        var detailData = _.filter(data, {
            id: articleID
        });
        
        //console.log(data);

        /* Templating with Mustache */
        nanoajax.ajax({
            url: 'assets/templates/top-story.mst' // Get the template.
        }, function (code, template) {
            document.querySelector('#top-story').innerHTML = Mustache.render(template, detailData);
        });

    };
    
    return {
        topStories: topStories,
        topStory: topStory
    }    
    
})();