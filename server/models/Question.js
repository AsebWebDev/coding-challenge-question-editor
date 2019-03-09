const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The question name is required'],
    minlength: 1
  },
  colTitles: [String],
  rows: [
      {
        title: {type: String},
        col: [ Boolean ] //TODO: Make false as default
      }
  ]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;