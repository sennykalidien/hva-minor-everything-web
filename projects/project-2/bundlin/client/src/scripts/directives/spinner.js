app.directive('spinner', function() {
  var opts = {
    lines: 15, // The number of lines to draw
    length: 0, // The length of each line
    width: 2, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 24, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000', // #rgb or #rrggbb or array of colors
    speed: 1.2, // Rounds per second
    trail: 70, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };

  return {
    restrict: 'EA',
    link: function(scope, elm, attrs) {
      // Retrieve settings
      var type = attrs.type || false;
      var color = attrs.color || false;
      var options = opts;
      var target = elm[0];

      // Apply classes
      elm.addClass('bln-spinner');
      if(type) elm.addClass('bln-spinner-'+type);

      // Change options based on settings
      switch(type) {
        case "content":
          options.radius = 8;
          options.width = 2;
          break;
        case "button":
          options.radius = 4;
          options.width = 1;
          break;
        case "row":
          options.radius = 4;
          options.width = 1;
          break;
      }

      // Set color
      if(color === 'invert') {
        options.color = "#fff";
      } else if(color) {
        options.color = color;
      }

      // Apply spinner to target element
      var spinner = new Spinner(options).spin(target);
    }
  };
});