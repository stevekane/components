var async = require("async")
  , _ = require("lodash")
  , isArray = _.isArray

var doTransIf = function (transaction, conditionals, cb) {
  if (isArray(conditionals)) {
    async.series(conditionals, function (err) {
      if (err) return cb(err);
      else transaction(cb);
    });
  } else {
    conditionals(function (err) {
      if (err) return cb(err);
      else transaction(cb);
    }); 
  }
};

module.exports.doTransIf = doTransIf;
