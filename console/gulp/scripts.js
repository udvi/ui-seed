'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var plugins = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

gulp.task('scripts-reload', function ()
{
    return buildScripts()
        .pipe(browserSync.stream());
});

gulp.task('scripts', function ()
{
    return buildScripts();
});

function buildScripts()
{
    return gulp.src([
        path.join(conf.paths.src, '/core/**/*.js'),
        path.join(conf.paths.src, '/app/**/*.js')
    ])
    // Enable the following two lines if you want linter
    // to check your code every time the scripts reloaded
    //.pipe($.eslint())
    //.pipe($.eslint.format())
        .pipe(plugins.size())
};