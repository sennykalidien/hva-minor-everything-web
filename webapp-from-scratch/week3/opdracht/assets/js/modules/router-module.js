/*********************************************************  
	ROUTER [with router lib: Routie]
*********************************************************/
APP.router = { // Literal object: 'router'.  
    init: function (data) {
        routie({ // Routie checks what comes behind the hashtag (#) of the link and selects it. 
            'top-story/:articleID': function (articleID) {
                //APP.router.toggle(window.location.hash.slice(0, 10)); //only get the hashtag
                APP.page.topStory(data, articleID); // Page templating
            },
            '': function () {
                //APP.router.toggle(window.location.hash);
                APP.page.topStories(data); // Page templating
            }           
        });
    }
};