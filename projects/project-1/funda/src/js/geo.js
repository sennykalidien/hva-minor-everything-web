/*********************************************************
	GEO LOCATION
*********************************************************/
APP.geo = (function () {
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                displayPosition,
                displayError, {
                    enableHighAccuracy: true,
                    maximumAge: 0
                }
            );
        }
    }

    function displayPosition(position) {
        var gpsToCity = ['https://nominatim.openstreetmap.org/reverse?format=json&lat=', '&lon='],
            lat = position.coords.latitude,
            lon = position.coords.longitude,
            zoom = '&zoom=13&addressdetails=1',
            CityUrl = gpsToCity[0] + lat + gpsToCity[1] + lon + zoom;

        APP.data.request(CityUrl)
            .then(function (response) {
                var cityData = JSON.parse(response);
                var city = cityData.address.city || cityData.address.town;
                localStorage.setItem('Location', city)

                console.log(city);

                APP.data.getHouses(city);
            })
    }

    function displayError() {
        console.log('an error has occured');
    }

    return {
        getLocation: getLocation,
        displayPosition: displayPosition
    };

})();
