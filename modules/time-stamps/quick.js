var async = require('async');
var _ = require("lodash");
var pluck = _.pluck;
var find = _.find;
var extend = _.extend;
var partial = _.partial;
var partialRight = _.partialRight;
var ts = require('./time-stamps');
var Video = ts.Video;
var Note = ts.Note;
var NoteType = ts.NoteType;
var addNote = ts.addNote;
var removeNote = ts.removeNote;

//pretty print full object
var log = function (hash) {
  if (hash instanceof Error) console.log(hash.stack);
  else console.log(JSON.stringify(hash, null, 2));
};

//video of infiltration vs kbrad
var ytId = "iMsMH6A03M8";

var video = new Video(ytId, 1380000);

var firstNote = new Note(1, 2, 20000, "Best fight evar");
var secondNote = new Note(1, 1, 30000, "Worst thing happened");
var invalidNote = new Note(6, 1, 45000, "Not gonna happen");

addNote(video, firstNote, function (err, res) {
  video.notes = res.notes;
  addNote(video, invalidNote, function (err, res) {
    log(err);
    //video.notes = res.notes;
    //log(video);
  });
  var noteToRemove = find(video.notes, {uuid: video.notes[0].uuid});

  //log(noteToRemove);
  removeNote(video, noteToRemove.uuid, function (err, res) {
    video.notes = res.notes;
    log(video);
  });
});

var updateNotes = function (err, diff, cb) {
  if (err) log(err); 
  else video.notes = diff.notes;
  if (cb) cb();
};
