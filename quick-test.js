var _ = require("lodash");
var keys = _.keys;
var find = _.find;
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
  },
  messages: [
    "You shouldn't talk about that",
    "You should always eat barf",
    "don't ever ever" 
  ]
}

var wrappedTree = Wrapper(tree);
var newUser = {
  name: "billy",
  email: "bb@comcom.com"
};

set(wrappedTree, "user", newUser);

var msgs = get(wrappedTree, "messages");
var user = get(wrappedTree, "user");

_.forEach(msgs, function (msg) {
  console.log(getValue(msg));
});
