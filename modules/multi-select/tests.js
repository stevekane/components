var test = require('tape');
var _ = require('lodash');
var contains = _.contains;
var pluck = _.pluck;
var last = _.last;
var clone = _.clone;
var multiSelect = require('./multi-select');
var Candidate = multiSelect.Candidate;
var Widget = multiSelect.Widget;
var addSelection = multiSelect.addSelection;
var removeSelection = multiSelect.removeSelection;
var removeLastSelection = multiSelect.removeLastSelection;
var incrementSelectionIndex = multiSelect.incrementSelectionIndex;
var decrementSelectionIndex = multiSelect.decrementSelectionIndex;
var updateSearch = multiSelect.updateSearch;
var focus = multiSelect.focus;
var clearSearch = multiSelect.clearSearch;
var clearSelections = multiSelect.clearSelections;
var serialize = multiSelect.serialize;
var set = multiSelect.set;

var candidate1 = Candidate({id: 1, value: "Billy"});
var candidate2 = Candidate({id: 2, value: "Tommy"});
var candidate3 = Candidate({id: 3, value: "Jesse"});
var candidate4 = Candidate({id: 4, value: "Molly"});

var candidates = [
  candidate1,
  candidate2,
  candidate3,
  candidate4
];

var selection3 = clone(candidate3);
var selection4 = clone(candidate4);

var selections = [
  selection3,
  selection4
];

var ms = Widget({
  name: "friends",
  focused: true,
  search: "puppies",
  candidates: candidates,
  selections: selections
});

var nested = {
  person: {
    name: "Steven" 
  }
};

test("creating a Widget with search returns correct list of matches", function (t) {
  t.plan(2);
  var widget = Widget({
    name: "friends",
    focused: true,
    search: "ll",
    candidates: candidates,
    selections: selections
  });

  t.same(candidate1, widget.matches[0], "ll matches Billy");
  t.same(candidate4, widget.matches[1], "ll matches Molly");
});

test("creating Widget with empty search returns all candidates as matches", function (t) {
  t.plan(1);
  var widget = Widget({
    name: "friends",
    focused: true,
    search: "",
    candidates: candidates,
    selections: selections
  });

  t.same(widget.matches, candidates, "empty search returns all matches");
});

test("creating Widget returns a selection index of 0", function (t) {
  t.plan(1);
  var widget = Widget({
    name: "friends",
    focused: true,
    search: "",
    candidates: candidates,
    selections: selections
  });

  t.same(widget.selectionIndex, 0, "returns selection index of 0");
});

test("creating Widget with selectionIndex returns bounded index", function (t) {
  t.plan(3);
  var widgetOk = Widget({
    name: "friends",
    focused: true,
    search: "",
    candidates: candidates,
    selections: selections,
    selectionIndex: 2
  });
  var widgetNegative = Widget({
    name: "friends",
    focused: true,
    search: "",
    candidates: candidates,
    selections: selections,
    selectionIndex: -2 
  });
  var widgetHigh = Widget({
    name: "friends",
    focused: true,
    search: "",
    candidates: candidates,
    selections: selections,
    selectionIndex: 6
  });

  t.same(widgetOk.selectionIndex, 2, "returns selection index of 2");
  t.same(widgetNegative.selectionIndex, 0, "returns selection index of 0");
  t.same(widgetHigh.selectionIndex, 3, "returns selection index of 3");
});

//this occurs because the search filters candidates into matches
test("creating Widget with both search and selectionIndex returns bounded index", 
function (t) {
  t.plan(1); 
  var widget = Widget({
    name: "friends",
    focused: true,
    search: "ll",
    candidates: candidates,
    selections: selections,
    selectionIndex: 2
  });

  t.same(widget.selectionIndex, 1, "returns selection index of 1");
});

test("addSelection adds provided id to selections if id in candidates", function (t) {
  t.plan(2);
  var widget = addSelection(ms, candidate2);
  var selectionIds = pluck(widget.selections, "id");
  var wasAdded = contains(selectionIds, candidate2.id);

  t.true(wasAdded, "selection was correctly added");
  t.ok(ms !== widget, "addSelection returns new object");
});

test("removeLastSelection removes last selection", function (t) {
  t.plan(2);
  var widget = removeLastSelection(ms);
  var selectionIds = pluck(widget.selections, "id");
  var wasRemoved = !contains(selectionIds, last(ms.selections).id);

  t.true(wasRemoved, "removed last selection");
  t.ok(ms !== widget, "removeSelection returns new object");
});

test("incrementSelectionIndex attempts to increment selectionIndex", function (t) {
  t.plan(1);
  var widget = Widget({
    name: "friends",
    focused: true,
    search: "",
    candidates: candidates
  });
  var incremented = incrementSelectionIndex(widget);
  
  t.equal(incremented.selectionIndex, 1, "selectionIndex incremented to 1");
});

test("incrementSelectionIndex does not update if invalid", function (t) {
  t.plan(1);
  var widget = Widget({
    name: "friends",
    focused: true,
    search: "",
    candidates: candidates,
    selectionIndex: 3
  });
  var unchanged = incrementSelectionIndex(widget);
  
  t.equal(unchanged.selectionIndex, 3, "selectionIndex unchanged at 3");
});

test("decrementSelectionIndex attempts to decrement selectionIndex", function (t) {
  t.plan(1);
  var widget = Widget({
    name: "friends",
    focused: true,
    search: "",
    candidates: candidates,
    selectionIndex: 2
  });
  var decremented = decrementSelectionIndex(widget);
  
  t.equal(decremented.selectionIndex, 1, "selectionIndex decremented to 1");
});

test("decrementSelectionIndex does not update if invalid", function (t) {
  t.plan(1);
  var widget = Widget({
    name: "friends",
    focused: true,
    search: "",
    candidates: candidates,
    selectionIndex: 0
  });
  var unchanged = decrementSelectionIndex(widget);
  
  t.equal(unchanged.selectionIndex, 0, "selectionIndex unchanged at 0");
});

test("updateSearch returns widget with new search and matches values", function (t) {
  t.plan(4);
  var newSearch = updateSearch(ms, "ll");

  t.same(newSearch.search, "ll", "search updated correctly");
  t.same(candidate1, newSearch.matches[0], "ll matches Billy");
  t.same(candidate4, newSearch.matches[1], "ll matches Molly");
  t.ok(ms !== newSearch, "updateSearch returns new object");
});

test("focus changes the value of focus", function (t) {
  t.plan(3);
  var isntFocused = focus(ms, false);
  var isFocused = focus(ms, true);

  t.same(isntFocused.focused, false, "focused set to false");
  t.same(isFocused.focused, true, "focused set to true");
  t.ok(ms !== isntFocused, "focues returns new object");
});

test("clearSearch clears the search value and updates matches", function (t) {
  t.plan(3);
  var cleared = clearSearch(ms);

  t.same(cleared.search, "", "search was cleared");
  t.same(cleared.matches.length, 4, "empty search means all candidates are matches");
  t.ok(ms !== cleared, "clearSearch returns new object");
});

test("clearSelections clears selections array", function (t) {
  t.plan(2);
  var cleared = clearSelections(ms);

  t.ok(cleared.selections.length === 0, "search was cleared");
  t.ok(ms !== cleared, "clearSelections returns new object");
});
