var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var config = require('./config');

gulp.task('test', config.buildTasks, function () {
  // TODO:
});
