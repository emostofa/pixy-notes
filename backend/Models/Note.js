const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
  },

  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  category: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  editedOn: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("Note", notesSchema);

module.exports = User;
