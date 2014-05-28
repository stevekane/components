var uuid = require("node-uuid")
  , _ = require("lodash")
  , extend = _.extend
  , mustProvide = require("./utils").mustProvide;

var Note = function (hash) {
  mustProvide(hash, ["content", "timeStamp", "typeId", "userId"]);

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
      typeId: 1,
      content: "" 
    },
    fields: {
      typeId: null,
      content: "" 
    } 
  };
  var fields = {
    typeId: hash.note.typeId,
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
    typeIds: [1, 2, 3, 4, 5, 6],
    notes: [],
    state: -1,
    currentTime: 0
  };

  extend(video, defaults, hash)
  return video;
};

module.exports.Note = Note;
module.exports.NoteForm = NoteForm;
module.exports.Video = Video;
