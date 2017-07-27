'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});


gulp.task('html', ['inject', 'partials'], function ()
{
    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), {read: false});
    var partialsInjectOptions = {
        starttag    : '<!-- inject:partials -->',
        ignorePath  : path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false
    };

    var cssFilter = plugins.filter('**/*.css', {restore: true});
    var jsFilter = plugins.filter('**/*.js', {restore: true});
    var htmlFilter = plugins.filter('*.html', {restore: true});

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
        .pipe(plugins.inject(partialsInjectFile, partialsInjectOptions))
        .pipe(plugins.useref())
        .pipe(jsFilter)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify({preserveComments: plugins.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
        .pipe(plugins.rev())
        .pipe(plugins.sourcemaps.write('maps'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.cleanCss())
        .pipe(plugins.rev())
        .pipe(plugins.sourcemaps.write('maps'))
        .pipe(cssFilter.restore)
        .pipe(plugins.revReplace())
        .pipe(htmlFilter)
        .pipe(plugins.htmlmin({
            collapseWhitespace: true,
            maxLineLength     : 120,
            removeComments    : true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe(plugins.size({
            title    : path.join(conf.paths.dist, '/'),
            showFiles: true
        }));
});