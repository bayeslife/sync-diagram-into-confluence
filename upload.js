var through = require('through2');

var util = require('gulp-util');

var publishModule = require('ConfluencePageAttacher/publish-module');

module.exports = function() {
  /**
   * @this {Transform}
   */
  var transform = function(file, encoding, callback) {
    console.log("Uploading" + file.path);
    // setTimeout(function(){
    //      console.log('Uploaded'+ file.path)
    //      callback();
    // },1000)
    publishModule.sync(file.path,function(){
      console.log('Published')
      callback();
    });
  };

  return through.obj(transform);
};
