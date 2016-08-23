// task: concat
module.exports = function(grunt) {
    var vendorSpec = grunt.file.readJSON('src/vendor.json');

    return {

        // targets
        scripts_project: {
            options: {
                separator: ';'
            },
            src: [
                'environment.js',
                'src/scripts/custom/**/*.js',
                'src/scripts/app.js',
                'src/scripts/!(custom)/**/*.js',
                '.grunt-tmp/js/templates.js'
            ],
            dest: '.grunt-tmp/js/app.js'
        },
        scripts_vendor: {
            options: {
                separator: ';'
            },
            src: vendorSpec.devScripts.concat(vendorSpec.scripts),
            dest: '.grunt-tmp/js/vendor.js'
        },
        scripts_vendor_prod: {
            options: {
                separator: ';'
            },
            src: [
                '.grunt-tmp/js/modernizr.js'
            ].concat(vendorSpec.scripts),
            dest: '.grunt-tmp/js/vendor.js'
        },
        styles_vendor: {
            options: {
                separator: ';'
            },
            src: vendorSpec.styles,
            dest: '.grunt-tmp/css/vendor.css'
        }

    }
};
