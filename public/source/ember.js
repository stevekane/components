var ms = require("../../multi-select");
var candidates = require("../../candidates.json").candidates;

var App = Ember.Application.create({
  rootElement: "#ember"
});

App.FormsInputComponent = Ember.TextField.extend({
  focusIn: function () {
    this.sendAction("focus");
  },
  focusOut: function () {
    this.sendAction("unfocus");
  },
});

App.FormsMultiselectComponent = Ember.Component.extend({
  init: function () {
    this.set("widget", {
      name: this.get("name"),
      search: this.get("search"),
      selections: this.get("selection"),
      candidates: this.get("candidates"),
      focused: this.get("focused") || false
    });
    this._super(arguments);
  },

  actions: {
    addSelection: function (value) {
      var widget = this.get('widget');
      //this.set("widget", ms.addSelection(widget, 
    },
    focus: function () {
      var widget = this.get('widget');
      this.set("widget", ms.focus(widget, true));
    },
    unfocus: function () {
      var widget = this.get('widget');
      this.set("widget", ms.focus(widget, false));
    }
  }
});
