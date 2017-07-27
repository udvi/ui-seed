'use strict';

var gulp = require('gulp');
var klawSync = require('klaw-sync');

klawSync('./gulp', {
    filter : function (file) {
        return (/\.(js|coffee)$/i).test(file.path);
    }
}).map(function (file)
    {
        require(file.path);
    }
);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});