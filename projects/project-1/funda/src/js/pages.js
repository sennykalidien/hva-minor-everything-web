/*********************************************************
	PAGES [with templating lib: Mustache]
*********************************************************/
APP.page = (function () {
    var _mainSelector = document.querySelector('main');
    var _loader = document.getElementById('loader');

    function houseVideo(data) {
        APP.data.request('./dist/templates/house-videos.mst')
            .then(function (template) {
                _mainSelector.innerHTML = Mustache.render(template, data);
                _loader.classList.remove('active');

                APP.storage.init();
            })
    };

    function houseDetail(data) {
        APP.data.request('./dist/templates/house-detail.mst')
            .then(function (template) {
                _mainSelector.innerHTML = Mustache.render(template, data);
                _loader.classList.remove('active');
            })
    };

    function houseFavourites(data) {

        if (localStorage.getItem("houseID") != null) {
            var IDs = localStorage.getItem('houseID');
        } else {
            var IDs = [];
        }

        /* Filter ID */
        var data = data.filter(function(c) {
            return IDs.indexOf(c.id) != -1
        });

        console.log(data);


        APP.data.request('./dist/templates/house-favourites.mst')
            .then(function (template) {
                _mainSelector.innerHTML = Mustache.render(template, data);
                _loader.classList.remove('active');

                APP.storage.init();
            })
    };

    return {
        houseVideo: houseVideo,
        houseDetail: houseDetail,
        houseFavourites: houseFavourites
    };

})();
