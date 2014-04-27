var _ = require('lodash');
var extend = _.extend;
var cloneDeep = _.cloneDeep;
var reduce = _.reduce;

//define a non-mutative setter.  this is swappable
var set = function (object, updates) {
  var copy = extend(cloneDeep(object), cloneDeep(updates));

  copy.__proto__ = object.__proto__;
  copy.constructor = object.constructor;

  return copy;
};

//used internally in get for property lookup
var innerGet = function (object, key) {
  return object[key];
};

//getter... path is "." separated property path
var get = function (object, path) {
  var keys = path.split(".");

  return reduce(keys, function (obj, key) {
    return obj ? innerGet(obj, key) : undefined;
  }, object);
};

module.exports.get = get;
module.exports.set = set;
