var wrapper = require('./modules/object-wrapper/object-wrapper');
var Wrapper = wrapper.Wrapper;
var get = wrapper.get;
var getValue = wrapper.getValue;
var set = wrapper.set;
var setProperties = wrapper.setProperties;

var tree = {
  user: {
    name: "Jean Rottenberries",
    email: "jean@gmail.com"
  }
}

var wrappedTree = Wrapper(tree);

var user = get(wrappedTree, "user");

setProperties(user, {
  name: "boobman",
  email: "whoa@suchboobs.com"
});
