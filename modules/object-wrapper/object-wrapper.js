var _ = require("lodash");
var reduce = _.reduce;
var cloneDeep = _.cloneDeep;
var extend = _.extend;

//returns substring before last instance of character
var stringBeforeLast = function (str, character) {
  var index = str.lastIndexOf(character); 

  return index > -1 ? str.substring(0, index) : "";
};

//returns substring after last instance of character
var stringAfterLast = function (str, character) {
  var index = str.lastIndexOf(character);

  return index > -1 ? str.substring(index + 1) : "";
};

//chop up a string path like "path.to.something" and return object
var lookupOnPath = function (object, path) {
  if (!path) return object;
  var keys = path.split(".");
  
  return reduce(keys, function (obj, key) {
    return obj ? obj[key] : undefined;
  }, object);
};

//finds object or value at provided combined path
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

  return new Wrapper(wrapper._inner, newPath); 
};

//returns deepClone of object found at this path
var getValue = function (wrapper, path) {
  var fullPath = getFullPath(wrapper._relativePath, path);
  var object = lookupOnPath(wrapper._inner, fullPath);

  return cloneDeep(object);
};

//set value for provided path
//if no path, then set value to whatever is at the wrappers innerpath
var set = function (wrapper, path, value) {
  if (!value) {
    value = path;  
    path = "";
  }

  var fullPath = getFullPath(wrapper._relativePath, path);
  var pathExceptLastKey;
  var last;
  var object;

  /* if we have dotted path, find object before last .
   * if we have a string path, set key by string name on _inner
   * else, set the value of wrapper._inner
   */
  if (fullPath.indexOf(".") > -1) {
    pathExceptLastKey = stringBeforeLast(fullPath, ".");
    last = stringAfterLast(fullPath, ".");
    object = lookupOnPath(wrapper._inner, pathExceptLastKey);
    object[last] = value;
  } else if (fullPath) {
    object = wrapper._inner;
    object[fullPath] = value;
  } else {
    wrapper._inner = value; 
  }

  return wrapper;
};

//set an hash of k/v pairs on object at provided path
//if no path, then set value to whatever is at the wrappers innerpath
var setProperties = function (wrapper, path, hash) {
  if (!hash) {
    hash = path;  
    path = "";
  }

  var fullPath = getFullPath(wrapper._relativePath, path);
  var pathExceptLastKey;
  var last;
  var object;

  /* if we have dotted path, find object before last .
   * if we have a string path, set key by string name on _inner
   * else, set the value of wrapper._inner
   */
  if (fullPath.indexOf(".") > -1) {
    pathExceptLastKey = stringBeforeLast(fullPath, ".");
    last = stringAfterLast(fullPath, ".");
    object = lookupOnPath(wrapper._inner, pathExceptLastKey);
    extend(object[last], hash);
  } else if (fullPath) {
    object = wrapper._inner;
    extend(object[fullPath], hash);
  } else {
    extend(wrapper._inner, hash);
  }

  return wrapper;
};

module.exports.Wrapper = Wrapper;
module.exports.get = get;
module.exports.getValue = getValue;
module.exports.set = set;
module.exports.setProperties = setProperties;
