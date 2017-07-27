'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var flatten = require('gulp-flatten');

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function ()
{
    return gulp.src(mainBowerFiles())
        .pipe(filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe(flatten())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});