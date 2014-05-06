var _ = require("lodash");
var extend = _.extend;
var ts = require('./time-stamps');
var Video = ts.Video;
var Note = ts.Note;
var NoteType = ts.NoteType;
var addNote = ts.addNote;

//pretty print full object
var log = function (hash) {
  console.log(JSON.stringify(hash, null, 6));
};

//video of infiltration vs kbrad
var ytId = "iMsMH6A03M8";

var video = new Video(ytId, 1380000);

var firstNote = new Note(1, 2, 20000, "Best fight evar");
var secondNote = new Note(1, 1, 30000, "Worst thing happened");

var addFirst = addNote(video, firstNote);
extend(video, addFirst.delta);
var addFirstAgain = addNote(video, firstNote);
extend(video, addFirstAgain.delta);
var addSecond = addNote(video, secondNote);
extend(video, addSecond.delta);

log(video);
