var gulp = require('gulp'),
    exit = require('gulp-exit'),
    mocha = require('gulp-mocha');

gulp.task('default', function() {
  console.log('default task running');
});

gulp.task('test', function() {
  process.env.NODE_ENV = 'test';
  return gulp.src('app/tests/*.js', {read: false})
             .pipe(mocha())
             .pipe(exit());
});
