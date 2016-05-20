var gulp = require('gulp'),
	clean = require('gulp-clean'),
	sourcemaps = require('gulp-sourcemaps'),
	notify = require('gulp-notify'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	cssnano = require('gulp-cssnano'),
    svgSprite = require('gulp-svg-sprite'),
    critical = require('critical'),
	imageop = require('gulp-image-optimization'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    copy = require('gulp-copy'),
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

var onError = function (err) {
    console.log(err);
};

var inputPath = {
    'css': './src/css/*.css',
    'js': './src/js/*.js',
	'lib': './src/lib/*.js',
	'templates': './src/templates/*.mst',
    'svg': './src/img/icons/svg/*.svg'
};

var outputPath = {
    'css': './dist/css/',
    'js': './dist/js/',
    'lib': './dist/lib/',
    'img': './dist/img/',
	'templates': './dist/templates/',
    'icons': './dist/img/icons/'
};


gulp.task('icons', function () {
    gulp.src(inputPath.svg)
        .pipe(svgSprite(svgConfig))
        .pipe(gulp.dest(outputPath.icons));
});


gulp.task('critical', function (cb) { //src: http://fourkitchens.com/blog/article/use-gulp-automate-your-critical-path-css
    critical.generate({
        base: './',
        src: 'public/index.html',
        css: ['./public/src/css/fonts.css', './public/src/css/reset.css', './public/src/css/style.css'],
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
        dest: './public/dist/css/critical.css',
        minify: true,
        extract: false
            //ignore: ['font-face']
    });
});


gulp.task('scripts', ['clean-scripts'], function () {
    gulp.src(inputPath.js)
        .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(concat('app.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPath.js))
        .pipe(filesize())
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});


gulp.task('styles',['clean-styles'], function () {
    gulp.src(inputPath.css)
        .pipe(sourcemaps.init())
            .pipe(autoprefixer())
            .pipe(concat('style.min.css'))
            .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(outputPath.css))
        .pipe(filesize())
        .pipe(notify({
            message: 'Styles task complete'
        }));
});


gulp.task('images',['clean-images'], function (cb) {
    gulp.src(['./src/img/*.png', './src/img/*.jpg', './src/img/*.gif', './src/img/*.jpeg', './src/img/*.ico']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(outputPath.img)).on('end', cb).on('error', cb);
});


gulp.task('copy-lib', function () {
    gulp.src([inputPath.lib])
        .pipe(gulp.dest((outputPath.lib)));
});

gulp.task('copy-templates', function () {
    gulp.src([inputPath.templates])
        .pipe(gulp.dest((outputPath.templates)));
});

// CLEAN
gulp.task('clean-scripts', function () {
  return gulp.src(outputPath.js, {read: false})
    .pipe(clean());
});

gulp.task('clean-styles', function () {
  return gulp.src(outputPath.css, {read: false})
    .pipe(clean());
});

gulp.task('clean-images', function () {
  return gulp.src(outputPath.img, {read: false})
    .pipe(clean());
});


gulp.task('watch', function () {
    gulp.watch(inputPath.css, ['styles']);
    gulp.watch(inputPath.js, ['scripts']);
	gulp.watch(inputPath.templates, ['copy-templates']);
});


gulp.task('default', ['copy-lib', 'copy-templates', 'scripts', 'styles', 'images', 'watch']);
