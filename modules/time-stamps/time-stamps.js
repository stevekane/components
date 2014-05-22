var uuid = require("node-uuid");
var _ = require("lodash");
var contains = _.contains;
var pluck = _.pluck;
var find = _.find;
var reject = _.reject;
var cloneDeep = _.cloneDeep;
var extend = _.extend;

/**
 * Create a note if all mandatory params are present
 *
 * @param {String} typeId type of note by id
 * @param {String} userId user id that owns this note
 * @param {Number} timeStamp timestamp in ms where this note starts
 * @param {String} content content of the note
 * @param {Object} optional (Optional) hash of additional params
*/
var Note = function (noteTypeId, userId, timeStamp, content, optional) {
  var optional = optional || {};
  
  if (!content) throw new Error("Note has no content");
  if (!timeStamp) throw new Error("Note has no timestamp");
  if (!noteTypeId) throw new Error("Note has no noteTypeId");
  if (!userId) throw new Error("Note has no userID");

  extend(this, {uuid: uuid.v4()}, optional);
  this.content = content;
  //timeStamp is in ms
  this.timeStamp = timeStamp;
  this.noteTypeId = noteTypeId;
  this.userId = userId;
};

//Note type must have ID for purpose of this component
var NoteType = function (id, color, title, optional) {
  var optional = optional || {};

  if (!id) throw new Error("NoteType has no id");
  if (!color) throw new Error("NoteType has no color");
  if (!title) throw new Error("NoteType has no title");

  extend(this, {uuid: uuid.v4()}, optional);
  this.id = id;
  this.color = color;
  this.title = title;
};

/**
 * Create a Video object
 * From perspective of this component, video MUST have an id
 * It may optionally have an array of notes and an array of typeIds
 *
 * @param {String} id id of this video on youtube
 * @param {Number} duration duration of this video on youtube
 * @param {Object} optional (Optional) hash of additional params
*/
var Video = function (id, duration, optional) {
  var optional = optional || {};

  if (!id) throw new Error("Video has no id");
  if (!duration) throw new Error("Video has no duration");

  this.id = id || uuid.v4();
  this.duration = duration;
  this.notes = optional.notes || [];
  this.noteTypes = optional.noteTypes || [
    new NoteType(1, "red", "hype"),
    new NoteType(2, "yellow", "info"),
    new NoteType(3, "green", "marketing"),
    new NoteType(4, "blue", "link")
  ];
};

//HELPERS

//clone array, return array w/ new member on back
var appendTo = function (array, item) {
  var copy = cloneDeep(array); 

  copy.push(item);
  return copy;
};

//clone array, return array w/o targeted element
var removeFrom = function (array, prop, value) {
  var copy = cloneDeep(array);

  return reject(copy, function (each) {
    return each[prop] === value; 
  })
};

/*
 * All functions are transactions which return diffs
 * between the old state of the object and the new state.
 * How these diffs are used is left up to the user
 * in order to allow for the different paradigms of
 * frameworks that may wrap these functions 
 *
 * All transactions return 
 * {
 *  delta: {},
 *  feedback: "",
 *  err: null
 * }
 *
* */

/*
 * prevent duplicate notes being added
 * if a note is added that isn't of one of the available types
 * we should reject it
*/
var addNote = function (video, note, cb) {
  var duplicateNote = find(video.notes, {
    timeStamp: note.timeStamp,
    content: note.content,
    userId: note.userId
  });
  var validNoteTypes = pluck(video.noteTypes, "id");
  var invalidNoteType = !contains(validNoteTypes, note.noteTypeId);
  var noteAlreadyExists = !!duplicateNote;
  var err;
  var diff;

  if (invalidNoteType) {
    err = new Error("This is not a valid noteType for this video"); 
    diff = undefined;
  } else if (noteAlreadyExists) {
    err = new Error("You tried to add a duplicate note"); 
    diff = undefined;
  } else {
    err = null;
    diff = {notes: appendTo(video.notes, note)};
  }
  return cb(err, diff);
};

//removes note by uuid if found
var removeNote = function (video, uuid, cb) {
  var targetNote = find(video.notes, {uuid: uuid});
  var noteFound = !!targetNote;
  var err;
  var diff;

  if (noteFound) {
    err = null;
    diff = {notes: removeFrom(video.notes, "uuid", uuid)};
  } else {
    err = new Error("No note found with uuid " + uuid); 
    diff = undefined;
  }
  return cb(err, diff);
};

//Structs
module.exports.Video = Video;
module.exports.Note = Note;
module.exports.NoteType = NoteType;

//transactions
module.exports.addNote = addNote;
module.exports.removeNote = removeNote;
