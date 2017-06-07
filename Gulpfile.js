var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var debug = require('debug')('build');
var del = require('del');

var watch = require('gulp-watch');
var yargs = require('yargs');
var gulpdebug = require('gulp-debug');

var util = require('gulp-util');

var up = require('./upload.js');
var cv = require('./convert2.js');

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
    .parse(process.argv);

var sourceFolder = args['s'];
var destFolder= args['t'];

var sf = path.join(sourceFolder,'/*.png');
//console.log(sf);

gulp.task('png',function() {
  return watch([path.join(destFolder,'/*.png')])
   .pipe(up())
})

gulp.task('svg',function() {
  return watch([path.join(sourceFolder,'/*.svg')])
    .pipe(cv())
})

gulp.task('default',['png','svg']);
