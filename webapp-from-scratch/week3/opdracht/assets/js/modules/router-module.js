/*********************************************************  
	ROUTER [with router lib: Routie]
*********************************************************/
APP.router = { // Literal object: 'router'.  
    init: function (data) {
        //console.log(data);
        routie({ // Routie checks what comes behind the hashtag (#) of the link and selects it. 
            'top-story/:articleID': function (articleID) {
                APP.router.toggle(window.location.hash.slice(0, 10)); //only get the hashtag
                APP.page.topStory(data, articleID); // Page templating
                //console.log(data);
            },
            '': function () {
                APP.router.toggle(window.location.hash);
                APP.page.topStories(data); // Page templating
            }           
        });
    },
    toggle: function (route) {
        var sections = document.querySelectorAll('section');
        for (var i = 0; i < sections.length; i++) { // For loop to check all sections.
            sections[i].classList.remove('active'); // add inactive to ALL sections first.             

            if (!route) { // Default route
                sections[0].classList.add('active'); // remove inactive if no hashtag in the link                
            } else {
                document.querySelector(route).classList.add('active'); //remove inactive to the section that corresponds with the hashtag in the link.                    
            }
        }
    }
};