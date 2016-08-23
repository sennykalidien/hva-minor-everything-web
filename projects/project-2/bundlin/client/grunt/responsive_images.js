module.exports = {
    images: {
        options: {
            engine: "im",
            sizes: [{
                name: "-s",
                width: 100,
                quality: 75                  
                }, {
                name: '-m',
                width: 320,
                quality: 75                      
                }, {
                name: "-l",
                width: 640,
                quality: 75
                }]
        },
        files: [{
            expand: true,
            cwd: '.grunt-tmp/images/',            
            src: ['homepictures/*.{png,jpg,gif}', 'photoroll/*.{png,jpg,gif}', '*.jpg', 'teamphotos.png'],
            dest: '.grunt-tmp/images/'
            }]
    }
};