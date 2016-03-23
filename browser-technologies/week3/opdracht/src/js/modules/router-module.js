/*********************************************************  
	ROUTER MODULE [with router lib: Routie]
*********************************************************/      
APP.router = (function () {
    function init (data) {
        if (!window.location.hash) {
            window.location = '#shirts';
        }            
        routie({
            'shirts': function() {
                APP.page.shirts(data);
            },
            'shirt-:ID': function(ID) {
                APP.page.shirtDetail(data, ID);
            },
            'favourites': function() {
                APP.page.favourites(data);
            }            
        });
    };
    
    return {
        init: init
    };     
    
})();
    