'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var plugins = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');


gulp.task('styles-reload', ['styles'], function ()
{
    return buildStyles()
        .pipe(browserSync.stream());
});

gulp.task('styles', function ()
{
    return buildStyles();
});


var buildStyles = function ()
{
    // SASS Options
    var sassOptions = {
        style: 'expanded'
    };

    var injectFiles = gulp.src([
        path.join(conf.paths.src, '/core/scss/**/*.scss'),
        path.join(conf.paths.src, '/core/**/*.scss'),
        path.join(conf.paths.src, '/app/**/*.scss'),
        path.join('!' + conf.paths.src, '/core/scss/partials/**/*.scss'),
        path.join('!' + conf.paths.src, '/app/index.scss')
    ], {read: false});

    var injectOptions = {
        transform   : function (filePath)
        {
            filePath = filePath.replace(conf.paths.src + '/app/', '');
            return '@import "' + filePath + '";';
        },
        starttag    : '// injector',
        endtag      : '// endinjector',
        addRootSlash: false
    };

    return gulp.src([
        path.join(conf.paths.src, '/app/index.scss')
    ])
        .pipe(plugins.inject(injectFiles, injectOptions))
        .pipe(wiredep(_.extend({}, conf.wiredep)))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass(sassOptions)).on('error', conf.errorHandler('Sass'))
        .pipe(plugins.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')));
};