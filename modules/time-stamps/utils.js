var async = require("async")
  , _ = require("lodash")
  , forEach = _.forEach
  , cloneDeep = _.cloneDeep
  , reject = _.reject
  , isArray = _.isArray

var appendTo = function (array, item) {
  var copy = cloneDeep(array); 

  copy.push(item);
  return copy;
};

//clone array, return array w/o targeted element
var removeFrom = function (array, prop, value) {
  var copy = cloneDeep(array);

  return reject(copy, function (each) {
    return each[prop] === value; 
  })
};

var mustProvide = function (hash, keys) {
  if (!hash) throw new Error("No hash provided to constructor");
  forEach(keys, function (key) {
    if (!hash[key]) throw new Error("Must provide " + key);
  }); 
};

//pretty print full object
var log = function (hash) {
  if (hash instanceof Error) console.log(hash.stack);
  else console.log(JSON.stringify(hash, null, 2));
};

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


module.exports.appendTo = appendTo;
module.exports.removeFrom = removeFrom;
module.exports.mustProvide = mustProvide;
module.exports.log = log;
module.exports.doTransIf = doTransIf;
