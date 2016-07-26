var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var debug = require('debug')('build');
var del = require('del');
var svg2png = require('gulp-svg2png');
var watch = require('gulp-watch');
var yargs = require('yargs');
var gulpdebug = require('gulp-debug');
var clean = require('gulp-clean');

var util = require('gulp-util');

var up = require('./upload.js');

var pkg = require('./package.json');
var args = yargs
    .usage(pkg.description + "\n\n$0 -s [source directory] -o [target directory] -u [user] -p [password]")
    .version(pkg.version, 'version')
    .demand('t')
    .alias('t', 'target')
    .describe('t', 'Target directory')
    .demand('s')
    .alias('s', 'source')
    .describe('s', 'Source directory')
    // .demand('u')
    // .alias('u', 'user')
    // .describe('u', 'Username for logging into the proxy')
    // .demand('p')
    // .alias('p', 'password')
    // .describe('p', 'Password for logging into the proxy')
    .parse(process.argv);

var sourceFolder = args['s'];
var destFolder= args['t'];

// var username = args['u'];
// var password = args['p'];

gulp.task('svg2png',function () {
    console.log('SVG2PNG');
    gulp.src(path.join(sourceFolder,'*.svg'))
        .pipe(gulp.dest(destFolder))
        .pipe(svg2png())
        .pipe(gulp.dest(sourceFolder));
});

gulp.task('upload',['svg2png'], function(cb) {
  console.log('Upload');
  var f = path.join(sourceFolder,'*.png');

  var s = gulp.src(f)
  .pipe(up())
  .pipe(gulpdebug());
  return s;
});

gulp.task('clean-svg',['svg2png'], function() {
    var f = path.join(sourceFolder,'*.svg');
    var s = gulp.src(f).pipe(clean({force: true}));
    return s;
});

gulp.task('clean-png', ['upload'],function() {
    var f = path.join(sourceFolder,'*.png');
    //var s = gulp.src(f).pipe(clean({force: true}));
    var s = gulp.src(f);
    return s;
});

gulp.task('default', [],function() {
  watch([path.join(sourceFolder,'/*.svg')], function() {
      gulp.start( 'clean-svg' );
  });
  watch([path.join(sourceFolder,'/*.png')], function() {
      gulp.start( 'clean-png' );
  });
});
