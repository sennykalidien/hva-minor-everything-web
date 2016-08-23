// task: ng-annotate
module.exports = {

    // targets
    options: {
        add: true
    },
    project: {
        files: {
            '.grunt-tmp/js/app.js': ['.grunt-tmp/js/app.js']
        }
    }

};
