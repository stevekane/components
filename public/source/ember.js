var ms = require("../../modules/multi-select/multi-select");
var candidates = require("../../candidates.json").candidates;
var get = Ember.get;
var set = Ember.set;

var App = Ember.Application.create({
  rootElement: "#ember"
});

App.FormsInputComponent = Ember.TextField.extend({
  updateValue: function () {
    this.sendAction("update", this.value); 
  }.observes("value"),
});

App.FormsMultiselectComponent = Ember.Component.extend({
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

  actions: {
    updateSearch: function (search) {
      this.set("widget", ms.updateSearch(this.widget, search)); 
    },

    addSelection: function (value) {
      set(this, "search", "");
      set(this, "widget", ms.addSelection(this.widget));
    },

    removeSelection: function (selection) {
      set(this, "widget", ms.removeSelection(this.widget, selection));
    },

    serialize: function (widget) {
      console.log({matches: ms.serialize(widget)})
    }
  }
});
