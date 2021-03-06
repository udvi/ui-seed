'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var filter = require('gulp-filter');

gulp.task('other', function ()
{
    var fileFilter = filter(function (file)
    {
        return file.stat.isFile();
    });

    return gulp.src([
        path.join(conf.paths.src, '/**/*'),
        path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss}')
    ])
        .pipe(fileFilter)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('build',['html','fonts','other']);