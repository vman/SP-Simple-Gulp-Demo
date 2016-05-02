/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

//Load gulp plugin
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var spsave = require('gulp-spsave');

gulp.task('concat-js', function () {
    gulp.src("./Scripts/**/*.js")
    .pipe(concat("GulpDemo.js"))
    .pipe(gulp.dest("./Output"))
});

gulp.task('minify-js', ['concat-js'], function () {
    gulp.src("./Output/GulpDemo.js")
    .pipe(uglify())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest("./Output"))
});

gulp.task('upload-to-sp', ['minify-js'], function () {
    gulp.src("./Output/*.js")
      .pipe(spsave({
          username: "dev@yourtenant.onmicrosoft.com",
          password: "Password",
          siteUrl: "https://yourtenant.sharepoint.com/sites/dev/",
          folder: "Style Library/My Folder"
      }));
});

gulp.task('watch-js-upload-to-sp', function () {
    gulp.watch("./Scripts/**/*.js", ['upload-to-sp']);
});

