var gulp = require('gulp');
    critical = require('critical'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    imageop = require('gulp-image-optimization'),
    sourcemaps = require('gulp-sourcemaps'),
    filesize = require('gulp-filesize');


var svgConfig = {
    dest: '.',
    shape: {
        dimension: {
            maxWidth: 15,
            maxHeight: 15
        },
        spacing: {
            padding: 5,
        },
    },
    mode: {
        css: {
            dest: '.',
            sprite: 'icns',
            render: {
                css: true
            },
            example: true,
            prefix: '.icn-'
        }
    }
};

var inputPaths = {
    'css': './src/css/*.css',
    'js': './src/js/modules/*.js',
    'svg': './src/images/icons/svg/*.svg'
};

var outputPaths = {
    'css': './dist/css/',
    'js': './dist/js/',
    'images': './dist/images/',
    'icons': './dist/images/icons/'
};


gulp.task('critical', function (cb) { //src: http://fourkitchens.com/blog/article/use-gulp-automate-your-critical-path-css
    critical.generate({
        base: './',
        src: '/index.html',
        css: ['./src/css/style.css'],
        dimensions: [{
            width: 320,
            height: 480
    }, {
            width: 768,
            height: 1024
    }, {
            width: 1280,
            height: 960
    }],
        dest: './dist/css/critical.css',
        minify: true,
        extract: false
            //ignore: ['font-face']
    });
});


gulp.task('scripts', function () {
    return gulp.src(inputPaths.js)
        .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(concat('app.min.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPaths.js))
        .pipe(filesize())
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});


gulp.task('styles', function () {
    return gulp.src(inputPaths.css)
        .pipe(sourcemaps.init())
            .pipe(autoprefixer())
            .pipe(concat('style.min.css'))
            .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPaths.css))
        .pipe(filesize())
        .pipe(notify({
            message: 'Styles task complete'
        }));
});


gulp.task('images', function (cb) { //https://www.npmjs.com/package/gulp-image-optimization 
    return gulp.src(['./src/images/*.png', './src/images/*.jpg', './src/images/*.gif', './src/images/*.jpeg'])
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(outputPaths.images)).on('end', cb).on('error', cb);
});


gulp.task('watch', function () {
    gulp.watch(inputPaths.css, ['styles']);
    gulp.watch(inputPaths.js, ['scripts']);
});