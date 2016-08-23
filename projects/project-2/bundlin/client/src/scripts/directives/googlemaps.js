app.directive('googlemaps', function() {

  var key = 'AIzaSyDpZYfosiwZ62qxOaa86CvlOC8_bmUgCdg';

  return {
    restrict: 'AE',
    scope: {
      latitude: "@",
      longitude: "@",
      zoom: "@",
      name: "@",
      mode: "@",
      streetviewAvailability: "=setStreetviewAvailabilityTo"
    },
    link: function(scope, elm, attrs) {

      var map, panorama, marker, location;

      scope.$watch(function() {
        return scope.latitude + scope.longitude;
      }, function() {
        location = new google.maps.LatLng(scope.latitude, scope.longitude);
        checkStreetViewAvailability(location);
      });

      // Create an array of styles.
      var styles = [{"featureType":"landscape.natural.landcover","elementType":"labels.text.fill","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#F1FF00 "},{"saturation":-27.4},{"lightness":9.4},{"gamma":1}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#e9ebed "},{"saturation":-78},{"lightness":67}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"},{"hue":"#ffffff "},{"saturation":-100},{"lightness":100}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"},{"hue":"#bbc0c4 "},{"saturation":-93},{"lightness":31}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"},{"hue":"#ffffff "},{"saturation":-100},{"lightness":100}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"},{"hue":"#e9ebed "},{"saturation":-90},{"lightness":-8}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#e9ebed "},{"saturation":10},{"lightness":69}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"on"},{"hue":"#2c2e33 "},{"saturation":7},{"lightness":19}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"},{"hue":"#bbc0c4 "},{"saturation":-93},{"lightness":31}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"simplified"},{"hue":"#bbc0c4 "},{"saturation":-93},{"lightness":-2}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"hue":"#32b38c"}]}];
      var styledMap = new google.maps.StyledMapType(styles, { name: "Map" });

      var enableMapsMode = function() {
        // Initialize map
        map = new google.maps.Map(elm[0], {
          center: location,
          zoom: 10, // parseInt(scope.zoom, 10)
          panControl: true,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: false,
          scrollwheel: false,
          overviewMapControl: false,
          mapTypeControlOptions: {
            mapTypeIds: []
          }
        });

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');

        // Place marker
        marker = new google.maps.Marker({
          position: location,
          map: map
        });
      };

      var enableStreetViewMode = function() {
        // Initialize streetview
        panorama = new google.maps.StreetViewPanorama(elm[0], {
          position: location
        });
        panorama.setVisible(true);

        // Calculate heading
        var service = new google.maps.StreetViewService;
        service.getPanoramaByLocation(panorama.getPosition(), 50, function(panoData, status) {
          if(status !== 'OK') {
            scope.streetviewAvailability = false;
          }
          if (panoData !== null) {
            var panoCenter = panoData.location.latLng;
            var heading = google.maps.geometry.spherical.computeHeading(panoCenter, location);
            var pov = panorama.getPov();
            pov.heading = heading;
            panorama.setPov(pov);
          }
        });

        // Place marker
        marker = new google.maps.Marker({
          position: location,
          map: panorama
        });
      };

      var switchMode = function(mode) {
        if(mode === 'street') {
          enableStreetViewMode();
        } else {
          enableMapsMode();
        }
      };

      scope.$watch('mode', function(newVal) {
        switchMode(newVal);
      });

      switchMode(scope.mode);

      var checkStreetViewAvailability = function(location) {
        if(!scope.streetviewAvailability) return;

        location = location || false;
        if(!location) return;

        var service = new google.maps.StreetViewService;
        service.getPanoramaByLocation(location, 50, function(panoData, status) {
          scope.streetviewAvailability = (status === 'OK');
        });
      };

    }
  };
});
