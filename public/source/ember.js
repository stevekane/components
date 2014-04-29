var ms = require("../../modules/multi-select/multi-select");
var candidates = require("../../candidates.json").candidates;
var get = Ember.get;
var set = Ember.set;

var App = Ember.Application.create({
  rootElement: "#ember"
});

App.FormsMultiselectComponent = Ember.Component.extend({
  search: "",

  setDefaultWidget: function () {
    set(this, "widget", ms.Widget({ 
      name: this.get("name"),
      search: this.get("search"),
      candidates: candidates,
      focused: this.get("focused") || false
    }));
  }.on("init"),

  focusIn: function () {
    set(this, "widget", ms.focus(this.widget, true)); 
  },

  //wrap this in timeout to allow dropdown to be clicked before vanishing
  focusOut: function (e) {
    Ember.run.later(this, function () {
      set(this, "widget", ms.focus(this.widget, false)); 
    }, 100);
  },

  //wrap selections with "active" for templating
  matches: function () {
    var matches = this.get('widget.matches'); 
    var selectionIndex = this.get('widget.selectionIndex');

    return matches.map(function (match, index) {
      return {
        match: match,
        active: selectionIndex === index
      }; 
    });
  }.property("widget.matches.[]", "widget.selectionIndex"),

  //observes our widget's selections and sets them to a bound prop
  updateValues: function () {
    set(this, "values", this.get('widget.selections'));
  }.observes("widget.selections.[]"),

  //when search changes, update widget
  updateSearch: function () {
    set(this, "widget", ms.updateSearch(this.widget, this.search)); 
  }.observes("search"),

  actions: {
    addSelection: function (value) {
      set(this, "widget", ms.addSelection(this.widget, value));
      set(this, "search", "");
    },

    addActiveSelection: function () {
      set(this, "widget", ms.addSelection(this.widget));
      set(this, "search", "");
    },

    removeSelection: function (selection) {
      var index = this.widget.selections.indexOf(selection);

      set(this, "widget", ms.removeSelection(this.widget, index));
    },

    removeLastSelection: function () {
      set(this, "widget", ms.removeLastSelection(this.widget));
    }
  }
});
