// grunt watch specification
module.exports = {

    // targets
    styles_project: {
        files: [ 'src/styles/**/*.less' ],
        tasks: [ 'less', 'copy:styles_project', 'autoprefixer:styles_project', 'copy:styles_project', 'clean:tmp' ]
    },
    styles_vendor: {
        files: [ 'src/vendor/**/*.css', 'src/vendor.json' ],
        tasks: [ 'concat:styles_vendor', 'cssmin:styles_vendor', 'copy:styles_vendor', 'clean:tmp' ]
    },
    scripts_project: {
        files: [ 'src/scripts/**/*.js' ],
        tasks: [ 'concat:scripts_project', 'copy:scripts_project', 'copy:scripts_project', 'clean:tmp' ]
    },
    scripts_vendor: {
        files: [ 'src/vendor/**/*.js', 'src/vendor.json' ],
        tasks: [ 'concat:scripts_vendor', 'uglify:scripts_vendor', 'copy:scripts_vendor', 'clean:tmp' ]
    },
    
    statics: {
        files: [ 'src/statics/**/*' ],
        tasks: [ 'clean:statics', 'htmlmin:index', 'htmlmin:views', 'copy:statics', 'copy:statics_html', 'replace:cache_bust_index', 'replace:cache_bust_sw', 'clean:tmp' ]
    },

    livereload: {
        options: {
            livereload: true
        },
        files: ['build/**/*']
    }

};
