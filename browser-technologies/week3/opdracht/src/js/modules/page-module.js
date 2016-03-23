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
        /* Filter ID */
        var detailData = _.filter(data, function(c){
            return ID.indexOf(c.id) != -1
        });     
        
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
        var ID = localStorage.getItem('shirtID');
        
        /* Filter ID */
        var favouriteData = _.filter(data, function(c){    
            return ID.indexOf(c.id) != -1
        });
        
        console.log(favouriteData)
        
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