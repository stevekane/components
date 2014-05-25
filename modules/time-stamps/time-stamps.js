var uuid = require("node-uuid");
var _ = require("lodash");
var contains = _.contains;
var pluck = _.pluck;
var find = _.find;
var reject = _.reject;
var cloneDeep = _.cloneDeep;
var extend = _.extend;
var partial = _.partial;
var appendTo = require("./utils").appendTo;
var removeFrom = require("./utils").removeFrom;
var mustProvide = require("./utils").mustProvide;
var doTransIf = require("./transactions").doTransIf;

//STRUCTS
var Note = function (hash) {
  mustProvide(hash, ["content", "timeStamp", "noteTypeId", "userId"]);

  var note = {};
  var defaults = {
    uuid: uuid.v4()
  };

  extend(note, defaults, hash);
  return note;
};

var NoteForm = function (hash) {
  mustProvide(hash, ["note"]);

  var noteform = {};
  var defaults = {
    uuid: uuid.v4(),
    defaults: {
      noteTypeId: null,
      content: "" 
    },
    fields: {
      noteTypeId: null,
      content: "" 
    } 
  };
  var fields = {
    noteTypeId: hash.note.noteTypeId,
    content: hash.note.content
  };
  
  extend(noteform, defaults);
  extend(noteform.fields, fields);
  return noteform;
};

var Video = function (hash) {
  mustProvide(hash, ["ytId", "duration"]);

  var video = {};
  var defaults = {
    uuid: uuid.v4(),
    noteTypeIds: [1, 2, 3, 4, 5, 6],
    notes: [],
    state: -1,
    currentTime: 0
  };

  extend(video, defaults, hash)
  return video;
};
//END STRUCTS

//CONDITIONALS
var noteIsUnique = function (video, note, cb) {
  var duplicateNote = find(video.notes, {
    timeStamp: note.timeStamp,
    content: note.content,
    userId: note.userId
  });

  cb(!!duplicateNote ? new Error("This note already exists") : null);
};

var noteIsValidType = function (video, note, cb) {
  var isValid = contains(video.noteTypeIds, note.noteTypeId);

  cb(isValid ? null : new Error("Note is not a valid type"));
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

//END CONDITIONALS

//OPERATIONS
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
//END OPERATIONS

//TRANSACTIONS
var addNote = function (video, note, cb) {
  doTransIf(
    partial(appendNote, video, note),
    [
      partial(noteHasValidTimestamp, video, note),
      partial(noteIsValidType, video, note),
      partial(noteIsUnique, video, note)
    ],
    cb
  );
};

//removes note by uuid if found
var removeNote = function (video, uuid, cb) {
  doTransIf(
    partial(detachNote, video, uuid),
    partial(noteFoundByUuid, video, uuid),
    cb
  );
};

//update content of a noteform if length less than max
var updateNoteformContent = function (noteform, content, cb) {
  doTransIf(
    partial(changeNoteformContent, noteform, content),
    partial(isValidLength, 80, content),
    cb
  );
};

//END TRANSACTIONS

module.exports.Video = Video;
module.exports.Note = Note;
module.exports.NoteForm = NoteForm;

module.exports.addNote = addNote;
module.exports.removeNote = removeNote;
module.exports.updateNoteformContent = updateNoteformContent;
