'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var htmlmin = require('gulp-htmlmin');
var angularTemplatecache = require('gulp-angular-templatecache')


gulp.task('partials', function ()
{
    return gulp.src([
        path.join(conf.paths.src, '/core/**/*.html'),
        path.join(conf.paths.src, '/app/**/*.html'),
        path.join(conf.paths.tmp, '/serve/core/**/*.html'),
        path.join(conf.paths.tmp, '/serve/app/**/*.html')
    ])
        .pipe(htmlmin({
            collapseWhitespace: true,
            maxLineLength     : 120,
            removeComments    : true
        }))
        .pipe(angularTemplatecache('templateCacheHtml.js', {
            module: 'templates',
            root  : 'templates'
        }))
        .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});