app.factory('fieldWatcher', function($document) {
  var watchers = [];
  var pressedKeys = "";

  $document.on('keypress', function(e) {
    pressedKeys += String.fromCharCode(e.which);
    _.each(watchers, function(watcher) {
      if(pressedKeys.indexOf(watcher.word) != -1) {
        watcher.scope.$apply(watcher.handler);
        pressedKeys = "";
      }
    });
  });

  return function(word, handler, scope) {
    watchers.push({word:word, handler:handler, scope:scope});
  };
});