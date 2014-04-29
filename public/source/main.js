var emberApp = require("./ember");
var ReactApp = require("./react.jsx");
var backboneApp = require("./backbone");
var ms = require("../../modules/multi-select/multi-select");
var candidates = require("../../candidates.json").candidates;

var reactRoot = document.getElementById("reactRoot");

var widget = ms.Widget({
  name: "react-ms",
  candidates: candidates,
  selections: [{id: 1, value: "Street Fighter IV"}],
  search: "Sup"
});

//closure over our widget instance
var set = function (newWidget) {
  widget = newWidget;
};

var tick = function () {
  React.renderComponent(ReactApp({
    widget: widget,
    set: set
  }), reactRoot);
  window.requestAnimationFrame(tick);
};

window.requestAnimationFrame(tick);
