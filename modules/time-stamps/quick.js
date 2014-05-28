var async = require("async");
var _ = require("lodash");
var extend = _.extend;
var partial = _.partial;
var ts = require('./index');
var Video = ts.Video;
var Note = ts.Note;
var NoteForm = ts.NoteForm;
var addNote = ts.addNote;
var removeNote = ts.removeNote;
var updateNoteformContent = ts.updateNoteformContent;
var updateNoteformType = ts.updateNoteformType;
var log = require("./utils").log;
var doTransIf = require("./utils").doTransIf;

var video = Video({
  ytId: "iMsMH6A03M8",
  duration: 1380000
});

var note1 = Note({
  content: "pretty sun dress",
  timeStamp: 13000,
  typeId: 1,
  userId: 1
});

var note2 = Note({
  content: "hot pants",
  timeStamp: 18000,
  typeId: 2,
  userId: 1
});

var noteForm = NoteForm({
  note: note1
});

var addAndUpdate = function (video, note, cb) {
  addNote(video, note, function (err, diff) {
    if (err) return log(err);
    else cb(null, extend(video, diff));
  });
};

var updateFormContent = function (noteform, content, cb) {
  updateNoteformContent(noteform, content, function (err, diff) {
    if (err) {
      return log(err); 
    } else {
      noteform.fields.content = diff.fields.content;
      cb(null, noteform);
    }
  });
};

var updateFormType = function (video, noteform, typeId, cb) {
  updateNoteformType(video, noteform, typeId, function (err, diff) {
    if (err) {
      return log(err);
    } else {
      noteform.fields.typeId = diff.fields.typeId;
      cb(null, noteform);
    } 
  });
};

async.series([
  partial(addAndUpdate, video, note1),
  partial(addAndUpdate, video, note2),
  partial(updateFormContent, noteForm, "updated"),
  partial(updateFormType, video, noteForm, 2),
  partial(updateFormType, video, noteForm, 4),
  partial(updateFormContent, noteForm, "moose"),
], function (err) {
  log(err);
  log(video);
  log(noteForm);
});
