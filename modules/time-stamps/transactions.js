var _ = require("lodash");
var partial = _.partial;
var utils = require("./utils");
var conditions = require("./conditions");
var transforms = require("./transforms");
var mustProvide = utils.mustProvide;
var doTransIf = utils.doTransIf;
var noteIsUnique = conditions.noteIsUnique;
var noteIsValidType = conditions.noteIsValidType;
var noteFoundByUuid = conditions.noteFoundByUuid;
var noteHasValidTimestamp = conditions.noteHasValidTimestamp;
var isValidLength = conditions.isValidLength;
var isValidType = conditions.isValidType;
var appendNote = transforms.appendNote;
var detachNote = transforms.detachNote;
var changeNoteformContent = transforms.changeNoteformContent;
var changeNoteformType = transforms.changeNoteformType;

var addNote = function (video, note, cb) {
  var transaction = partial(appendNote, video, note);
  var conditions = [
    partial(noteHasValidTimestamp, video, note),
    partial(isValidType, video.typeIds, note.typeId),
    partial(noteIsUnique, video, note)
  ];

  doTransIf(transaction, conditions, cb);
};

var removeNote = function (video, uuid, cb) {
  var transaction = partial(detachNote, video, uuid);
  var condition = partial(detachNote, video, uuid);

  doTransIf(transaction, condition, cb);
};

var updateNoteformContent = function (noteform, content, cb) {
  var transaction = partial(changeNoteformContent, noteform, content);
  var condition = partial(isValidLength, 80, content);

  doTransIf(transaction, condition, cb);
};

var updateNoteformType = function (video, noteform, typeId, cb) {
  var transaction = partial(changeNoteformType, noteform, typeId);
  var condition = partial(isValidType, video.typeIds, typeId);

  doTransIf(transaction, condition, cb);
};

module.exports.addNote = addNote;
module.exports.removeNote = removeNote;
module.exports.updateNoteformContent = updateNoteformContent;
module.exports.updateNoteformType = updateNoteformType;
