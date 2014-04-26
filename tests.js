var test = require('tape');
var _ = require('lodash');
var contains = _.contains;
var multiSelect = require('./multi-select');
var mutations = require('./functional-mutations');
var Candidate = multiSelect.Candidate;
var Widget = multiSelect.Widget;
var addSelection = multiSelect.addSelection;
var removeSelection = multiSelect.removeSelection;
var removeLastSelection = multiSelect.removeLastSelection;
var updateSearch = multiSelect.updateSearch;
var focus = multiSelect.focus;
var clearSearch = multiSelect.clearSearch;
var clearSelections = multiSelect.clearSelections;
var serialize = multiSelect.serialize;
var set = mutations.set;
var get = mutations.get;

var candidate1 = Candidate({id: 1, name: "Billy"});
var candidate2 = Candidate({id: 2, name: "Tommy"});
var candidate3 = Candidate({id: 3, name: "Jesse"});
var candidate4 = Candidate({id: 4, name: "Molly"});

var candidates = [
  candidate1,
  candidate2,
  candidate3,
  candidate4
];

var selections = [3, 4];

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

test("addSelection adds provided id to selections if id in candidates", function (t) {
  t.plan(3);
  var withNewSelection = addSelection(ms, 2);
  var withoutNewSelection = addSelection(ms, 99);

  t.ok(contains(get(withNewSelection, "selections"), 2), "added selection");
  t.ok(!contains(get(withoutNewSelection, "selections"), 99), "didnt add selection");
  t.ok(ms !== withNewSelection, "addSelection returns new object");
});

test("removeSelection removes selection by id if found", function (t) {
  t.plan(2);
  var withoutSelection = removeSelection(ms, 3);

  t.ok(!contains(get(withoutSelection, "selections"), 3), "removed selection");
  t.ok(ms !== withoutSelection, "removeSelection returns new object");
});

test("removeLastSelection removes last selection", function (t) {
  t.plan(2);
  var withoutSelection = removeLastSelection(ms);

  t.ok(!contains(get(withoutSelection, "selections"), 4), "removed last selection");
  t.ok(ms !== withoutSelection, "removeSelection returns new object");
});

test("updateSearch returns widget with new search value", function (t) {
  t.plan(2);
  var newSearch = updateSearch(ms, "data...");

  t.same(get(newSearch, "search"), "data...", "search updated correctly");
  t.ok(ms !== newSearch, "updateSearch returns new object");
});

test("focus changes the value of focus", function (t) {
  t.plan(3);
  var isntFocused = focus(ms, false);
  var isFocused = focus(ms, true);

  t.same(get(isntFocused, "focused"), false, "focused set to false");
  t.same(get(isFocused, "focused"), true, "focused set to true");
  t.ok(ms !== isntFocused, "focues returns new object");
});

test("clearSearch clears the search value", function (t) {
  t.plan(2);
  var cleared = clearSearch(ms);

  t.same(get(cleared, "search"), "", "search was cleared");
  t.ok(ms !== cleared, "clearSearch returns new object");
});

test("clearSelections clears selections array", function (t) {
  t.plan(2);
  var cleared = clearSelections(ms);

  t.ok(get(cleared, "selections").length === 0, "search was cleared");
  t.ok(ms !== cleared, "clearSelections returns new object");
});

test("serialize returns expanded candidates for selections", function (t) {
  t.plan(2);
  var candidates = serialize(ms);

  t.notEqual(candidate3, candidates[0], "serialize returns new data");
  t.notEqual(candidate4, candidates[1], "serialize returns new data");
});
