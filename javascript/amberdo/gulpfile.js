// Copyright (C) 2014, John Varouhakis.
// This file is published under the MIT license

//this file can be used to automate running browserify and less-css
//compilations. It has watch tasks for those types of files and it can be
//configured by the [ paths ] object.



var gulp = require('gulp');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var exec = require('gulp-exec');

var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

var paths = {
  scripts: {
    entry: './js/app.js',
    watch: ['js/**/*.js'],
    dest: './build/js'
  },
  styles: {
    entry: './styles/less/main.less',
    watch: ['styles/**/*.less'],
    dest: './build/css'
  }
};

gulp.task('browserify', brFunc = function() {
  return browserify(paths.scripts.entry).bundle().on('error', function(error) {
    //this prevents a watch from crashing
    this.emit('end');
  }).pipe(source('bundle.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(exec('xkbbell'));
});

gulp.task('compile-less', function() {
  return gulp.src(paths.styles.entry)
      .pipe(less({compress: true}))
      .pipe(autoprefixer(['last 10 versions', 'ie 10'],{cascade: false}))
      .pipe(minifyCSS({keepBreaks: false}))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(exec('xkbbell'));
});

gulp.task('watch', function() {
  var jsTimer = -1;
  //debounce browserify, when multiple files are edited
  var jswatcher = gulp.watch(paths.scripts.watch, function() {
    clearTimeout(jsTimer);
    jsTimer = setTimeout(function() {
      brFunc();
    }, 1000);
  });
  jswatcher.on('change', taskWatcher);

  var lesswatcher = gulp.watch(paths.styles.watch, ['compile-less']);
  lesswatcher.on('change', taskWatcher);

  function taskWatcher(event) {
    console.log('File '+ event.path + ' was ' + event.type + ', running tasks...');
  }
});

gulp.task('default', ['browserify', 'compile-less']);
