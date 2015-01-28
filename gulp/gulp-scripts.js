var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: false});
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var config = require('./config');


var scriptsDir = './src/public';
var buildDir = './dist/scripts';


gulp.task('scripts', ['scripts-watch']);

gulp.task('scripts-once', function() {
  return buildScript('main.js', false);
});

gulp.task('scripts-watch', ['scripts-once'], function() {
  return buildScript('main.js', true);
});

// --- My old scripts task before react --- //
//gulp.task('scripts', function () {
//  return gulp.src(config.scriptsSrc)
//      .pipe(plugins.plumber())
//      .pipe(plugins.concat(config.scriptDistFileName))
//      .pipe(gulp.dest(config.scriptsDist))
//      .pipe(plugins.size({title: 'Scripts before minifying'}))
//      .pipe(plugins.rename({suffix: '.min'}))
//      .pipe(plugins.uglify())
//      .pipe(gulp.dest(config.scriptsDist))
//      .pipe(plugins.size({title: 'Scripts after minifying'}));
//});


// Based on: https://gist.github.com/Sigmus/9253068
function buildScript(file, watch) {
  var props = watchify.args;
  props.entries = [scriptsDir + '/' + file];
  props.debug = true;

  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  bundler.transform(reactify);
  function rebundle() {
    var stream = bundler.bundle();
    // TODO: remove gulp-notify
    return stream.on('error', plugins.notify.onError({
      title: "Compile Error",
      message: "<%= error.message %>"
    }))
      .pipe(source(file))
      .pipe(gulp.dest(buildDir + '/'));
  }
  bundler.on('update', function() {
    rebundle();
    plugins.util.log('Rebundle...');
  });
  return rebundle();
}
