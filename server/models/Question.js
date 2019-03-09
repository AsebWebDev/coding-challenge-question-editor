const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The question name is required'],
    minlength: 1
  },
  capitals: {
    type: [String],
    default: []
  },
  area: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;