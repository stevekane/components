var utils = require("./utils");
var appendTo = utils.appendTo;
var removeFrom = utils.removeFrom;

var appendNote = function (video, note, cb) {
  cb(null, {
    notes: appendTo(video.notes, note)
  });
};

var detachNote = function (video, uuid, cb) {
  cb(null, {
    notes: removeFrom(video.notes, "uuid", uuid)
  });
};

var changeNoteformContent = function (noteform, content, cb) {
  cb(null, {
    fields: {
      content: content 
    } 
  });
};

var changeNoteformType = function (noteform, noteTypeId, cb) {
  cb(null, {
    fields: {
      noteTypeId: noteTypeId
    } 
  });
};

module.exports.appendNote = appendNote;
module.exports.detachNote = detachNote;
module.exports.changeNoteformContent = changeNoteformContent;
module.exports.changeNoteformType = changeNoteformType;
