var emberApp = require("./ember");
var ReactApp = require("./react.jsx");
var backboneApp = require("./backbone");
var ms = require("../../modules/multi-select/multi-select");
var candidates = require("../../candidates.json").candidates;

var reactRoot = document.getElementById("reactRoot");

var widget = ms.Widget({
  name: "react-ms",
  candidates: candidates,
  search: ""
});

//closure over our widget instance to perform transactions
var transact = function (fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  args.unshift(widget);

  widget = fn.apply(this, args);
};

var tick = function () {
  React.renderComponent(ReactApp({
    widget: widget,
    transact: transact
  }), reactRoot);
  window.requestAnimationFrame(tick);
};

window.requestAnimationFrame(tick);
