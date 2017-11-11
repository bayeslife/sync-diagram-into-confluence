var through = require('through2');

var util = require('gulp-util');

const fs = require("pn/fs"); // https://www.npmjs.com/package/pn
const svg2png = require("svg2png");

var path = require('path');



module.exports = function() {
  /**
   * @this {Transform}
   */
  var transform = function(file, encoding, callback) {
    console.log("Converting:" + file.path.slice(0,-4)+".png");
    fs.readFile(file.path)
        .then(svg2png)
        .then(buffer => fs.writeFile(file.path.slice(0,-4)+'.png', buffer))
        .then(function(){
          console.log('Converted'+file.path);
          callback();
        })
        .catch(e => console.error(e));
  };

  return through.obj(transform);
};
