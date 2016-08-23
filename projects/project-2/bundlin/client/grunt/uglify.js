// task: uglify
module.exports = {

    // targets
    scripts_project: {
        options: {
            mangle: false,
            compress: {
                drop_console: true
            }
        },
        files: {
            '.grunt-tmp/js/app.js': [ '.grunt-tmp/js/app.js' ]
        }
    },
    scripts_vendor: {
        options: {
            mangle: false,
            compress: {
                drop_console: true
            }
        },
        files: {
            '.grunt-tmp/js/vendor.js': [ '.grunt-tmp/js/vendor.js' ]
        }
    }

};
