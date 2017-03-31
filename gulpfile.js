const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const pump = require('pump');

gulp.task('default', function(cb) {
    pump([
        gulp.src([
            './node_modules/vue/dist/vue.js',
            './node_modules/vue-material/dist/vue-material.js',
            './js/*.js'
        ]),
        concat('prod.js'),
        uglify(),
        gulp.dest('./js/')
    ], cb);
});