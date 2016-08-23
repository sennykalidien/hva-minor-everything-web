/*********************************************************
	ROUTER MODULE [with router lib: Routie]
*********************************************************/
APP.router = (function () {
    function init (houseIDs, city) {
        if (!window.location.hash) {
            window.location = '#videoID=' + houseIDs[0].id;
        }
        routie({
            'videoID=:ID': function(ID) {
                APP.data.getHouseVideo(ID, houseIDs);
            },
            'houseDetail=:ID': function(ID) {
                APP.data.getHouseDetail(ID);
            },
            'favourites': function() {
                APP.data.getHouseFavourites(city);
            }
        });
    };

    return {
        init: init
    };

})();
