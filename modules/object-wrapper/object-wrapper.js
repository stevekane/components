var _ = require("lodash");
var reduce = _.reduce;
var cloneDeep = _.cloneDeep;

//chop up a string path like "path.to.something" and return object
var lookupOnPath = function (object, path) {
  if (!path) return object;
  var keys = path.split(".");
  
  return reduce(keys, function (obj, key) {
    return obj ? obj[key] : undefined;
  }, object);
};

var getFullPath = function (oldPath, newPath) {
  var fullPath;

  if (oldPath && newPath) fullPath = oldPath + "." + newPath;
  else if (!oldPath && newPath) fullPath = newPath;
  else if (oldPath && !newPath) fullPath = oldPath;
  else fullPath = "";

  return fullPath;
};

//wraps arbitrarily nested pojo and stores relativepath
var Wrapper = function Wrapper (ref, relativePath) {
  if (!(this instanceof Wrapper)) return new Wrapper(ref, relativePath);

  this._relativePath = relativePath || "";
  this._inner = ref;
};

//return wrapper with updated relative path and ref to provided wrapper's ref
var get = function (wrapper, path) {
  var newPath = getFullPath(wrapper._relativePath, path);

  return Wrapper(wrapper._inner, newPath); 
};

//TODO: should this perhaps clone?  This would prevent "badness"
var getValue = function (wrapper, path) {
  var fullPath = getFullPath(wrapper._relativePath, path);
  var object = lookupOnPath(wrapper._inner, fullPath);

  return cloneDeep(object);
};

module.exports.Wrapper = Wrapper;
module.exports.get = get;
module.exports.getValue = getValue;
