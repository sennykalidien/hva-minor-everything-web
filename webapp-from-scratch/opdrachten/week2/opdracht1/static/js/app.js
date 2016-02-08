var APP = APP || { };

(function () {
    'use strict';

	APP.data = {
		get: function(){
			var url = 'http://directzichtbaar.nl/data.json';    		
			var json = 'json';    					
            
            qwest.get(url, {dataType: json})
                 .then(function(xhr, response) {
                    console.log(response);
            });    		
		}
	};
	
    APP.data.get();    
    
})();	    