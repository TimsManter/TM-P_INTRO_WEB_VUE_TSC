'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const pump = require('pump');

gulp.task('default', function (cb) {
    pump([
        browserify(['./js/script.js']).bundle(),
        source('script.min.js'),
        streamify(uglify()),
        gulp.dest('./dist/')
    ], cb);
});