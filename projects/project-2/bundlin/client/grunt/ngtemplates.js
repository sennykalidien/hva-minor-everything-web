// task: ngtemplates
module.exports = {

    // targets
    app: {
        cwd: 'src/statics/',
        src: '**/*.html',
        dest: '.grunt-tmp/js/templates.js',
        options: {
            module: 'bundlin',
            htmlmin: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }
    }

};
