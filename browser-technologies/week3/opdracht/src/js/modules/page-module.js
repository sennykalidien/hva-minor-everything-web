/********************************************************* 
	PAGE MODULE [with Promise]
*********************************************************/
APP.page = (function () {

    var _mainSelector = document.querySelector('main');

    function shirts(data) {
        APP.data.request('../opdracht/dist/templates/shirts.mst')
            .then(function (template) {
                _mainSelector.innerHTML = Mustache.render(template, data);
                APP.data.storage();
            })
            .catch(function (err) {
                console.error('There was an error!', err.statusText);
            });
    };

    function shirtDetail(data, ID) {
        var detailData = data.filter(function(c) {
             return ID.indexOf(c.id) != -1
        })        
        
        APP.data.request('../opdracht/dist/templates/shirt-detail.mst')
            .then(function (template) {
                _mainSelector.innerHTML = Mustache.render(template, detailData);
                APP.data.storage();
            })
            .catch(function (err) {
                console.error('There was an error!', err.statusText);
            });        
    };
    
    function favourites(data) {

        try {
            localStorage.test = 1;
            var ID = localStorage.getItem('shirtID');
        } catch (e) {
            function readCookie(key) {
                var nameEQ = key + "=";
                var ca = document.cookie.split(';');
                for (var i = 0, max = ca.length; i < max; i++) {
                    var c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            } 
            var cookieID = readCookie("shirtID");   
            if (cookieID === null) { 
                var ID = [];
            } else { 
                var ID = JSON.parse(cookieID);
            };
        };        
        
        /* Filter ID */
        var favouriteData = data.filter(function(c) {    
            return ID.indexOf(c.id) != -1
        });
        
        APP.data.request('../opdracht/dist/templates/favourites.mst')
            .then(function (template) {
                _mainSelector.innerHTML = Mustache.render(template, favouriteData); 
                APP.data.storage();
            })
            .catch(function (err) {
                console.error('There was an error!', err.statusText);
            });          
    };       

    return {
        shirts: shirts,
        shirtDetail: shirtDetail,
        favourites: favourites
    };

})();