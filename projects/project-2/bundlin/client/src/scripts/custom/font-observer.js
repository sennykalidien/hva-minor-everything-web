(function () {
    var fontFamilies = {
      'source-sans-pro': [
        {
          weight: 300,          
        },
        {
          weight: 400,          
        },          
        {
          weight: 'normal',          
        },
        {
          weight: 600
        },
        {
          weight: 700
        }          
      ],
      'proxima-nova': [
        {
          weight: 'normal'
        },
        {
          weight: 400
        }
      ]
    }    

    var fontObservers = [];    
    
    Object.keys(fontFamilies).forEach(function(family) {
      fontObservers.push(fontFamilies[family].map(function(config) {
        return new FontFaceObserver(family, config).check()
      }));
    });    
    
    Promise.all(fontObservers)
    .then(function() {
        document.documentElement.className += " fonts-loaded";
    }, function() {
        console.log('Fonts not available');
    });
}());