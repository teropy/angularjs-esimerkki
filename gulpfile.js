var gulp = require('gulp');
var gutil = require('gulp-util');
var express = require('express');
var path = require('path');
var tinylr = require('tiny-lr');
var livereload = require('gulp-livereload');
var nodeStatic = require('node-static');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
reloadServer = tinylr()


gulp.task('views', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('public/'));

  gulp.src('app/views/**/*.html')
    .pipe(gulp.dest('public/views'))
    .pipe(livereload(reloadServer));
});

gulp.task('scripts', function() {
  gulp.src('app/scripts/app.js')
    .pipe(browserify({
      shim: {
        "jquery": {
          path: './vendor/jquery/dist/jquery.js',
          exports: '$'
        },
        "bootstrap": {
          path: './vendor/bootstrap/dist/js/bootstrap.js',
          exports: 'bootstrap'
        },
        "angular": {
          path: './vendor/angular/angular.js',
          exports: 'angular'
        },
        "angular-route": {
          path: './vendor/angular-route/angular-route.js',
          exports: 'route'
        }
      }
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('public/js/'))
    .pipe(livereload(reloadServer));
});

gulp.task('styles', function() {
  return gulp.src('./vendor/bootstrap/dist/**/*')
    .pipe(gulp.dest('public/bootstrap'))
    .pipe(livereload(reloadServer));
});

gulp.task('server', function() {
  var static = require('node-static');
  var port = 8000;
  var fileServer = new static.Server('./public');
  require('http').createServer(function (request, response) {
      request.addListener('end', function () {
          fileServer.serve(request, response);
      }).resume();
  }).listen(port);
  console.log("Server listening to http://localhost:" + port);
});

gulp.task('watch', function () {
  reloadServer.listen(35729, function() {
    console.log('Live reload listening on %d', 35729);
  });

  gulp.watch('app/views/**/*.html', ['views']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/styles/*.css', ['styles']);
});

gulp.task('default', ['views', 'scripts', 'styles', 'watch', 'server']);
