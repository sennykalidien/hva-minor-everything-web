/*********************************************************
	GEO LOCATION
*********************************************************/
APP.geo = ( () => {
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                _displayPosition,
                _displayError, {
                    enableHighAccuracy: true,
                    maximumAge: 0
                }
            );
        }
    }

    function _displayPosition(position) {
        var gpsToCity = ['https://nominatim.openstreetmap.org/reverse?format=json&lat=', '&lon='],
            lat = position.coords.latitude,
            lon = position.coords.longitude,
            zoom = '&zoom=13&addressdetails=1',
            CityUrl = gpsToCity[0] + lat + gpsToCity[1] + lon + zoom;

        APP.data.request(CityUrl)
            .then( (response) => {
                var cityData = JSON.parse(response);
                var city = cityData.address.city || cityData.address.town;
                localStorage.setItem('Location', city)

                console.log(city);

                APP.data.getHouses(city);
            })
    }

    function _displayError() {
        console.log('an error has occured');
    }

    return {
        getLocation: getLocation
    };

})();
