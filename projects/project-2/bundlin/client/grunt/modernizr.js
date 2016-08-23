// task: modernizr
module.exports = {

    // targets
    project: {
        devFile: 'remote',
        outputFile: '.grunt-tmp/js/modernizr.js',
        uglify: false,
        files: {
            src: [
                'src/scripts/**/*.js',
                'src/styles/**/*.less',
                'src/statics/**/*.xml',
                'src/statics/**/*.html',
            ]
        }
    }

};
