app.filter('item', function() {
  return function(items, conditions) {
    return _.filter(items, function(item) {
      var match = false;
      _.each(conditions, function(condition) {
        match = match || eval(condition);
      });
      return match;
    });
  };
});