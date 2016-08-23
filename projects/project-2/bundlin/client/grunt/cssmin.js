// task: cssmin
module.exports = {

    // targets
    styles_project: {
        options: {
            report: 'min'
        },
        files: {
            '.grunt-tmp/css/app.css': [ '.grunt-tmp/css/app.css' ]
        }
    },
    styles_vendor: {
        options: {
            report: 'min'
        },
        files: {
            '.grunt-tmp/css/vendor.css': [ '.grunt-tmp/css/vendor.css' ]
        }
    },
    styles_critical: {
        options: {
            report: 'min'
        },
        files: {
            '.grunt-tmp/css/critical.css': [ '.grunt-tmp/css/critical.css' ]
        }
    }  
    
};
