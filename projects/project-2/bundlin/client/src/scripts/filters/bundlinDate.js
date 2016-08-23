app.filter('bundlinDate', function($filter) {
  return function(input, type) {
    var time = $filter('date')(input, 'HH:mm'),
        date = $filter('date')(input, 'mediumDate');

    switch(type) {
        case 'date':
            return date;
            break;
        case 'time':
            return time;
            break;
        default:
            return time + ' - ' + date;
            break;
    }
  };
});