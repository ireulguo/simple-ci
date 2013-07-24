// Generated by CoffeeScript 1.6.3
(function() {
  var files, fs, routers;

  fs = require('fs');

  routers = [];

  files = fs.readdirSync(__dirname);

  files.forEach(function(file) {
    if (file.match(/\.router\.js$/)) {
      return routers.push(require("./" + file));
    }
  });

  module.exports = function(app) {
    return routers.forEach(function(router) {
      var func;
      func = router.apply;
      if (typeof func === 'function') {
        return func(app);
      }
    });
  };

}).call(this);