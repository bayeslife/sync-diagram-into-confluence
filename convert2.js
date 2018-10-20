var debug= require('debug')('syncconfluence')
var through = require('through2');

var util = require('gulp-util');

var path = require('path');

var fs = require('fs');

var svg_to_png = require('svg-to-png');

module.exports = function() {
  /**
   * @this {Transform}
   */
  var transform = function(file, encoding, callback) {
    debug("Converting2" + file.path);

    var dir = path.dirname(file.path);
    var pngdir = path.join(dir,"../png");

    debug("Directory is:"+ dir);
    if(file.event!='unlink'){
      svg_to_png.convert(dir, pngdir) // async, returns promise
      .then( function(){
          console.log("Done");
          //callback();
          fs.unlink(file.path,function(){
            console.log("Deleted");
            callback()
          });
      })
      .catch(e => console.error(e));
    }else {
      callback();
    }

  };

  return through.obj(transform);
};
