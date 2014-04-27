var ms = require("../../modules/multi-select/multi-select");
var candidates = require("../../candidates.json").candidates;
var get = Ember.get;
var set = Ember.set;

var App = Ember.Application.create({
  rootElement: "#ember"
});

App.FormsMultiselectComponent = Ember.Component.extend({
  search: "",

  init: function () {
    set(this, "widget", ms.Widget({ 
      name: this.get("name"),
      search: this.get("search"),
      candidates: candidates,
      focused: this.get("focused") || false
    }));
    this._super(arguments);
  },

  focusIn: function () {
    set(this, "widget", ms.focus(this.widget, true)); 
  },

  focusOut: function () {
    set(this, "widget", ms.focus(this.widget, false)); 
  },

  updateSearch: function () {
    this.set("widget", ms.updateSearch(this.widget, this.search)); 
  }.observes("search"),

  actions: {
    addSelection: function (value) {
      set(this, "widget", ms.addSelection(this.widget));
      set(this, "search", "");
    },

    removeSelection: function (selection) {
      var index = this.widget.selections.indexOf(selection);

      set(this, "widget", ms.removeSelection(this.widget, index));
    },
  }
});
