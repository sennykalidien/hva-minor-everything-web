module.exports = {
    index: { // Target 
        options: { // Target options 
            removeComments: true,
            collapseWhitespace: true
        },
        files: { // Dictionary of files 
            '.grunt-tmp/statics/index.html': 'src/statics/index.html', // 'destination': 'source' 
        }
    },
    views: { // Target 
        options: { // Target options 
            removeComments: true,
            collapseWhitespace: true
        },
        expand: true,
        cwd: 'src/statics/views',
        src: ['**/*.html'],
        dest: '.grunt-tmp/statics/views/'
        }    
};