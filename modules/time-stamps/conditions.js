var _ = require("lodash");
var contains = _.contains;
var find = _.find;

var noteIsUnique = function (video, note, cb) {
  var duplicateNote = find(video.notes, {
    timeStamp: note.timeStamp,
    content: note.content,
    userId: note.userId
  });

  cb(!!duplicateNote ? new Error("This note already exists") : null);
};

var noteFoundByUuid = function (video, uuid, cb) {
  var foundNote = find(video.notes, {"uuid": uuid});

  cb(!!foundNote ? null : new Error("No note found for uuid " + uuid));
};

var noteHasValidTimestamp = function (video, note, cb) {
  var inRange = (note.timeStamp < video.duration) && (note.timeStamp >= 0);

  cb(inRange ? null : new Error(note.timeStamp + " is not a valid timeStamp"));
};

var isValidLength = function (length, content, cb) {
  cb(content.length <= length ? null : new Error("Maximum length exceeded"));
};

var isValidType = function (ids, id, cb) {
  var isValid = contains(ids, id);

  cb(isValid ? null : new Error("Not a valid note type"));
};

module.exports.noteIsUnique = noteIsUnique;
module.exports.noteFoundByUuid = noteFoundByUuid;
module.exports.noteHasValidTimestamp = noteHasValidTimestamp;
module.exports.isValidLength = isValidLength;
module.exports.isValidType = isValidType;
