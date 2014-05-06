var test = require("tape");
var _ = require("lodash");
var wrapper = require("./object-wrapper");
var Wrapper = wrapper.Wrapper;
var get = wrapper.get;
var getValue = wrapper.getValue;
var set = wrapper.set;
var setProperties = wrapper.setProperties;

test("Wrap returns an object with correct attributes", function (t) {
  t.plan(2);

  var tree = {
    user: {
      name: "Jean Rottenberries",
      email: "jean@gmail.com"
    } 
  }; 
  var wrapped = Wrapper(tree);

  t.same(wrapped._relativePath, "", "relative path is empty string");
  t.equal(tree, wrapped._inner, "_inner is a ref to the tree object");
});

test("get returns a wrapper object with updated _relativePath", function (t) {
  t.plan(2);

  var tree = {
    user: {
      name: "Jean Rottenberries",
      email: "jean@gmail.com"
    } 
  }; 
  var wrapped = Wrapper(tree);
  var user = get(wrapped, "user");

  t.same(user._relativePath, "user", "relative path is 'user'");
  t.equal(tree, user._inner, "_inner is a ref to the tree object");
});

test("getValue returns the actual value of the inner reference", function (t) {
  t.plan(4);
  var tree = {
    user: {
      name: "Jean Rottenberries",
      email: "jean@gmail.com"
    } 
  }; 
  var wrapped = Wrapper(tree);
  var user = get(wrapped, "user");
  var userValueFromTree = getValue(wrapped, "user");
  var userValueFromUser = getValue(user);

  t.same(userValueFromTree, tree.user, "returns value stored at user");
  t.same(userValueFromUser, tree.user, "returns value stored at user");
  t.ok(userValueFromTree !== tree.user, "getValue returns value not reference");
  t.ok(userValueFromUser !== tree.user, "getValue returns value not reference");
});

test("getValue returns the value at the wrapper's relative path when no path provided", function (t) {
  t.plan(2);
  var tree = {
    user: {
      name: "Jean Rottenberries",
      email: "jean@gmail.com"
    } 
  }; 
  var wrapped = Wrapper(tree);
  var treeValue = getValue(wrapped);
  
  t.same(tree, treeValue, "getValue returns value of wrapped object");
  t.ok(tree !== treeValue, "getValue returns value not original object");
});

test("set changes value on underlying tree", function (t) {
  t.plan(2);
  var tree = {
    user: {
      name: "Jean Rottenberries",
      email: "jean@gmail.com"
    } 
  }; 
  var newUser = {
    name: "Bob Villa",
    email: "lol@gmail.com" 
  };
  var wrapped = Wrapper(tree);
  set(wrapped, "user", newUser);

  t.same(getValue(wrapped, "user.name"), "Bob Villa", "name of user set correctly");
  t.same(getValue(wrapped, "user.email"), "lol@gmail.com", "email of user set correctly");
});

test("set correctly sets a nested property on underlying data structure", function (t) {
  t.plan(1);
  var tree = {
    user: {
      name: "Jean Rottenberries",
      email: "jean@gmail.com"
    } 
  }; 
  var wrapped = Wrapper(tree);
  var newName = "Billy Jean";
  set(wrapped, "user.name", newName);
  
  t.same(getValue(wrapped, "user.name"), "Billy Jean", "name of nested property set correctly");
});

test("setProperties correctly sets multiple properties on data structure", function (t) {
  t.plan(2);
  var user = {
    name: "Jean Rottenberries",
    email: "jean@gmail.com"
  }; 
  var wrappedUser = Wrapper(user);
  setProperties(wrappedUser, {
    name: "Don Juan",
    email: "dj@luv.com" 
  });

  t.same(getValue(wrappedUser, "name"), "Don Juan", "name set correctly by setProperties");
  t.same(getValue(wrappedUser, "email"), "dj@luv.com", "email correctly by setProperties");
});
