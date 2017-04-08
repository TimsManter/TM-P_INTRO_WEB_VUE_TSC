'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const streamify = require('gulp-streamify');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const pump = require('pump');

gulp.task('default', ['js', 'css']);

gulp.task('js', function (cb) {
    pump([
        browserify(['./js/script.js']).bundle(),
        source('script.min.js'),
        streamify(uglify()),
        gulp.dest('./dist/')
    ], cb);
});

gulp.task('css', function(cb) {
    pump([
        gulp.src('./scss/style.scss'),
        sass({outputStyle: 'compressed'}).on('error', sass.logError),
        rename('style.min.css'),
        gulp.dest('./dist/')
    ], cb);
});