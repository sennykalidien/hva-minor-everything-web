// task: copy
module.exports = {

    // targets
    scripts_project: {
        expand: true,
        cwd: '.grunt-tmp/js',
        src: 'app.js',
        dest: 'build/js'
    },
    scripts_vendor: {
        expand: true,
        cwd: '.grunt-tmp/js',
        src: 'vendor.js',
        dest: 'build/js'
    },
    styles_project: {
        expand: true,
        cwd: '.grunt-tmp/css',
        src: 'app.css',
        dest: 'build/css'
    },   
    styles_vendor: {
        expand: true,
        cwd: '.grunt-tmp/css',
        src: 'vendor.css',
        dest: 'build/css'
    },
    styles_critical: {
        expand: true,
        cwd: '.grunt-tmp/css',
        src: 'critical.css',
        dest: 'src/styles/critical'
    },  
    statics: {
        expand: true,
        cwd: 'src/statics/',
        src: ['**',  '!**/images', '!index.html'],
        dest: 'build/'
    },
    statics_html: {
        expand: true,
        cwd: '.grunt-tmp/statics/',
        src: ['**/**/*.html'],
        dest: 'build/'
    },    
    images: {
        expand: true,
        cwd: '.grunt-tmp/images',
        src: '**',
        dest: 'build/images'
    },    

};
