var gulp = require('gulp');
var markdown = require('gulp-markdown');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var open = require("gulp-open");

gulp.task('default', ['docs']);

gulp.task('docs', function () {
    return gulp.src('source/docs/**/*.md')
        .pipe(markdown())
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./_site/'))
        .pipe(connect.reload());
});

gulp.task('images', function () {
    return gulp.src('source/images/**')
        .pipe(gulp.dest('./_site/images/'))
        .pipe(connect.reload());
});

gulp.task('sass', function () {
    gulp.src('./source/stylesheets/**/*.scss')
        .pipe(sass({
          outputStyle: 'compressed'
        }))
        .on('error', function(err){
            displayError(err);
        })
        .pipe(gulp.dest('_site/stylesheets/'));
});

gulp.task('clean', function() {
  return gulp.src('_site', {read: false})
    .pipe(clean());
});

gulp.task('connect', function () {
  connect.server({
    root: ['_site'],
    port: 9000,
    livereload: true
  });
});

gulp.task('watch', ['clean', 'docs', 'images', 'connect'], function () {
    gulp.watch(['source/docs/**/*.md'], ['docs']);
    connect.reload();
});
