var through = require('through2');

var util = require('gulp-util');

var publishModule = require('ConfluencePageAttacher/publish-module');

module.exports = function() {
  /**
   * @this {Transform}
   */
  var transform = function(file, encoding, callback) {
    util.log("Upload");
    util.log(file.path);
    publishModule.sync(file.path,function(){
      console.log('Published')
      callback();
    });

  };

  return through.obj(transform);
};
