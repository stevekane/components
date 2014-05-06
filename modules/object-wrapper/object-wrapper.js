var _ = require("lodash");
var bind = _.bind;
var reduce = _.reduce;
var cloneDeep = _.cloneDeep;
var extend = _.extend;
var keys = _.keys;
var forEach = _.forEach;
var isArray = _.isArray;
var isObject = _.isObject;
var partial = _.partial;

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
  var segments = path.split(".");
  
  return reduce(segments, function (obj, segment) {
    return obj ? obj[segment] : undefined;
  }, object);
};

//finds object or value at provided combined path.  poor man's pattern matching
var getFullPath = function (oldPath, newPath) {
  if (oldPath && newPath) return oldPath + "." + newPath;
  else if (!oldPath && newPath) return newPath;
  else if (oldPath && !newPath) return oldPath;
  else return "";
};

/*
 * define "." and [] property access getters for all keys using get
 * configurable allows this property to be re-assigned
 * enumerable causes the property to be listed via Object.keys
*/
var defEnumerable = function (key) {
  Object.defineProperty(this, key, {
    configurable: true,
    enumerable: true,
    get: bind(get, this, key)
  });
};

//define props that should not be enumerable on wrapper but still gettable
var defNotEnumerable = function (obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: false,
    value: value 
  }); 
};

//wraps arbitrarily nested pojo and stores relativepath
var Wrapper = function Wrapper (ref, relativePath) {
  var obj;
  var target = lookupOnPath(ref, relativePath);
  var refKeys = keys(target);
  
  //this is the object or primitive value at this relativePath inside ref
  if (isArray(target)) obj = new ArrayWrapper(refKeys.length);
  else if (isObject(target)) obj = new HashWrapper;
  else obj = {};

  //we want all keys enumerable for exposure to Array/Object methods
  forEach(refKeys, defEnumerable, obj);

  //we don't want these properties exposed to Array/Object methods
  defNotEnumerable(obj, "_relativePath", relativePath || "");
  defNotEnumerable(obj, "_inner", ref);
  defNotEnumerable(obj, "constructor", Wrapper);

  return obj;
};

//wrapper for hashes which has Object prototype
var HashWrapper = function HashWrapper () {};

HashWrapper.prototype = Object.create(Object.prototype);

//wrapper for arrays which has Array prototye
var ArrayWrapper = function ArrayWrapper (length) {
  Object.defineProperty(this, "length", {
    enumerable: false,
    value: length
  });
};

ArrayWrapper.prototype = Object.create(Array.prototype);

//return wrapper with updated relative path and ref to provided wrapper's ref
var get = function (wrapper, path) {
  var newPath = getFullPath(wrapper._relativePath, path);

  return new Wrapper(wrapper._inner, newPath); 
};

//returns deepClone of object found at this path.  NB FOR wrapped objects only!
var getValue = function (wrapper, path) {
  if (!wrapper || wrapper.constructor !== Wrapper) return undefined;

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

  /* 
   * if we have dotted path, find object before last .
   * if we have a string path, set key by string name on _inner
   * else, set the value of wrapper._inner
   */
  if (fullPath.indexOf(".") > -1) {
    pathExceptLastKey = stringBeforeLast(fullPath, ".");
    last = stringAfterLast(fullPath, ".");
    object = lookupOnPath(wrapper._inner, pathExceptLastKey);
    if (!object) throw new Error("No object found at path " + pathExceptLastKey);
    object[last] = value;
  } else if (fullPath) {
    object = wrapper._inner;
    object[fullPath] = value;
    //define a new getter for returning wrapped objects
    //FIXME: perhaps do not need this?  consider via tests...
    defEnumerable.call(wrapper, fullPath);
  } else {
    wrapper._inner = value; 
  }

  return wrapper;
};

/*
 * if we have dotted path, find object before last .
 * if we have a string path, set key by string name on _inner
 * else, set the value of wrapper._inner
 */
var setProperties = function (wrapper, path, hash) {
  if (!hash) {
    hash = path;  
    path = "";
  }

  var fullPath = getFullPath(wrapper._relativePath, path);
  var pathExceptLastKey;
  var last;
  var object;

  if (fullPath.indexOf(".") > -1) {
    pathExceptLastKey = stringBeforeLast(fullPath, ".");
    last = stringAfterLast(fullPath, ".");
    object = lookupOnPath(wrapper._inner, pathExceptLastKey);
    extend(object[last], hash);
  } else if (fullPath) {
    object = wrapper._inner;
    extend(object[fullPath], hash);
    //define a new getter for returning wrapped objects
    //FIXME: perhaps do not need this?  consider via tests...
    defEnumerable.call(wrapper, fullPath);
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
