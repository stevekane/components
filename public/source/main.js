var EmberWidget = require("./ember");
var ReactWidget = require("./react.jsx");
var backboneApp = require("./backbone");
var ms = require("../../modules/multi-select/multi-select");
var candidates = require("../../candidates.json").candidates;

var reactRoot = document.getElementById("reactRoot");
var emberRoot = document.getElementById("ember");

var App = Ember.Application.create({
  rootElement: emberRoot
});

var emberWidget = ms.Widget({
  name: "ember-ms",
  candidates: candidates,
  search: ""
});

//inject our candidates into scope "the ember way"
App.ApplicationRoute = Ember.Route.extend({
  setupController: function (controller) {
    controller.set("widget", emberWidget);
  }
});

App.FormsMultiselectComponent = EmberWidget;

//global app state that undergoes mutations via transactions
var reactWidget = ms.Widget({
  name: "react-ms",
  candidates: candidates,
  search: ""
});

//closure over our widget instance to perform transactions
var transact = function (fn) {
  var args = Array.prototype.slice.call(arguments, 1);
  args.unshift(reactWidget);

  reactWidget = fn.apply(this, args);
};

var tick = function () {
  React.renderComponent(ReactWidget({
    widget: reactWidget,
    transact: transact
  }), reactRoot);
  window.requestAnimationFrame(tick);
};

tick();
