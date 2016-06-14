'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var runSequence = require('run-sequence');

gulp.task('default', function(callback){
  runSequence('build', callback);
})

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      port: 9090,
      directoryListing: {
        enable:true,
        path: 'app'
      },
      open: true
    }));
});

//Compiling and Building SASS Files
gulp.task('build-css', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./scss'));
});

gulp.task('build-css:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});


gulp.task('build', ['build-css', 'serve']);
